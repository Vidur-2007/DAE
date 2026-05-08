const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "mysecret";

app.post("/login", (req, res) => {
  const user = { id: 1, username: "admin" };
  const token = jwt.sign(user, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function authenticate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Protected Data", user: req.user });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});