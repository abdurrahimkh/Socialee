const express = require("express");
const router = express.Router();

const PostsController = require("./../controllers/PostsController");
const PostValidators = require("../validators/PostValidations");

router.get("/", PostsController.getAll);
router.get("/:slug", PostsController.getOne);
router.post("/", PostValidators.create, PostsController.create);
router.patch("/:slug", PostsController.updateOne);
router.delete("/:slug", PostsController.delete);

module.exports = router;
