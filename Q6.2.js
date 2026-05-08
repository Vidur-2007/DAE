const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());


const SECRET = "mysecretkey";


const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "user", password: "123", role: "user" },
];




app.post("/login", (req, res) => {
  const { username, password } = req.body;


  const user = users.find(
    (u) => u.username === username && u.password === password
  );


  if (!user) return res.status(401).json({ message: "Invalid credentials" });


  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );


  res.json({ token });
});



function authenticate(req, res, next) {
  const header = req.headers.authorization;


  if (!header) return res.sendStatus(403);


  const token = header.split(" ")[1]; 


  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);


    req.user = user;
    next();
  });
}



function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}



app.get("/", (req, res) => {
  res.send("Public API");
});


app.get("/dashboard", authenticate, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});


app.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});


app.get("/user", authenticate, authorize("user"), (req, res) => {
  res.json({ message: "Welcome User" });
});



app.listen(3000, () => {
  console.log(" Server running on port 3000");
});