require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;

app.use(express.static("public"));

// Router dei post
const postsRouter = require("./routers/routers/posts");

// Middleware per gestire JSON
app.use(express.json());

// Middleware per leggere JSON dal corpo della richiesta
app.use(bodyParser.json());

//Middleware
const checkTime = require("./middlewares/checkTime");
app.use(checkTime);

const errorsHandler = require("./middlewares/errorsHandler");

// Router con il prefisso /posts
app.use("/posts", postsRouter);

//Progetto base con una rotta
app.get("/", (req, res) => {
  res.json("Server del mio blog");
});

app.get("/blog", (req, res) => {
  const date = {
    posts: posts,
    length: posts.length,
  };

  res.json(date);
});

//Error handler
app.use(errorsHandler);

// Avvia il server
app.listen(port, () => {
  console.log(`App listening at ${domain}:${port}`);
});
