const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const app = express(); 
app.use(express.json());
app.use(cors()); 

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});


const Student = mongoose.model("Student", studentSchema);

app.get("/students", async (req, res) => {
  const data = await Student.find(); 
  res.json(data); 
});


app.get("/students/:id", async (req, res) => {
  const data = await Student.findById(req.params.id);
  res.json(data);
});


app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});


app.put("/students/:id", async (req, res) => {
  const data = await Student.findByIdAndUpdate(
    req.params.id,   
    req.body,         
    { new: true }      
  );
  res.json(data);      
});


app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
