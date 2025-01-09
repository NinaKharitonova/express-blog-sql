const connection = require("../db/connect");

// Index
const index = (req, res) => {
  let sql = "SELECT * FROM blog.posts";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
};

// Show
const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    const err = new Error(`Post con ID ${id} non trovato`);
    err.code = 404;
    throw err;
  }

  res.json(post);
};

// Create
const create = (req, res) => {
  res.send("Creazione di un nuovo post");
};

module.exports = {
  store: (req, res) => {
    module.exports = {
      store: (req, res) => {
        const { title, content, image, tags } = req.body;

        if (!title || !content || !image || !tags?.length) {
          const err = new Error("Parametro invalido");
          err.code = 400;
          throw err;
        }

        const newPost = {
          title,
          content,
          image,
          tags,
        };
        posts.push(newPost);

        console.log(posts);

        res
          .status(201)
          .json({ message: "Post aggiunto con successo!", data: newPost });
      },
    };
  },
};

// Update
const update = (req, res) => {
  const id = req.params.id;
  res.send(`Aggiornamento del post ${id}`);
};

module.exports = {
  update: (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, image, tags } = req.body;

    const post = posts.find((p) => p.id === postId);

    if (!post) {
      const err = new Error("Post non trovato!");
      err.code = 404;
      throw err;
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (image) post.image = image;
    if (tags) post.tags = tags;

    console.log(posts);

    res
      .status(200)
      .json({ message: "Post aggiornato con successo!", data: post });
  },
};

// Destroy
const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    const err = new Error(`Post con ID ${id} non trovato`);
    err.code = 404;
    throw err;
  }

  posts.splice(index, 1);

  console.log("Lista aggiornata:", posts);
  res.status(204).send(); // Nessun contenuto
};

module.exports = { index, show, create, update, destroy };
