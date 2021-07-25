require('dotenv').config()

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 80;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

// Route Middlewares
app.use("/user", authRouter)
app.use("/posts", postsRouter)

// Connect to DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.set('trust proxy', 1);

app.get("/", (req, res) => {
  res.send("Wsb-blog backend works!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
