const express = require("express");
const router = express.Router();

const postsController = require("../../controllers/postsController");

// Rotte CRUD

// Index
router.get("/", postsController.index);

// Show
router.get("/:id", postsController.show);

// Create
router.post("/", postsController.create);

// Update
router.put("/:id", postsController.update);

// Destroy
router.delete("/:id", postsController.destroy);

module.exports = router;
