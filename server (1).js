const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

mongoose.connect("mongodb://127.0.0.1:27017/chatapp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const MessageSchema = new mongoose.Schema({
  text: String,
  time: String,
});

const Message = mongoose.model("Message", MessageSchema);

io.on("connection", (socket) => {
  socket.on("sendMessage", async (msg) => {
    const newMsg = new Message(msg);
    await newMsg.save();
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {});
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});