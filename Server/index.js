const User = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
require("dotenv").config();

const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapShot = await User.get();
  const users = snapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.send(users);
});

app.get("/LogIn", (req, res) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    res.send(user);
    next();
  } catch (error) {
    // Token is invalid or expired
    res.send(null);
  }
});

app.post("/create", async (req, res) => {
  let data = req.body;
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_KEY);
  console.log(data)
  await User.add(data);
  res.send(accessToken);
});


app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({ msg: "Deleted" });
});


app.listen(PORT);