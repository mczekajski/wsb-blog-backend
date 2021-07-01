// require('dotenv').config()

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const port = process.env.PORT || 80;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json());

app.set('trust proxy', 1);

const users = [{ name: "Name" }];

const postsRouter = require('./routes/posts')

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/posts", postsRouter)

app.get("/users", (req, res) => {
  res.json(users);
  console.log("Get users req");
});

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name == req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
