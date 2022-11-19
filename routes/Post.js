const express = require("express");
const router = express.Router();

const PostsController = require("./../controllers/PostsController");

router.get("/", PostsController.getAll);
router.get("/:slug", PostsController.getOne);
router.post("/", PostsController.create);
router.patch("/:slug", PostsController.updateOne);
router.delete("/:slug", PostsController.delete);

module.exports = router;
