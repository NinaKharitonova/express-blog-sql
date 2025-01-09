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
  const sqlBlog = "SELECT * FROM blog.posts WHERE `id` = ?";

  connection.query(sqlBlog, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Posts not found " });
    }

    let post = results[0];

    res.json(post);
  });
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
  const sql = "DELETE FROM blog.posts WHERE `id` = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.sendStatus(204);
  });
};

module.exports = { index, show, create, update, destroy };
