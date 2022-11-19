const Post = require("../models/Post");

exports.getAll = (req, res) => {
  res.send("ALL POSTS");
};

exports.getOne = (req, res) => {
  res.send("ONE POST");
};

exports.create = async (req, res) => {
  try {
    const { title, body } = req.body;

    const post = await Post.create({ title, body });

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.warn("Error: ", error);

    res.status(201).json({
      status: "success",
      data: {
        message: "Error creating post !",
      },
    });
  }
};

exports.updateOne = (req, res) => {
  res.send("Update One POST");
};

exports.delete = (req, res) => {
  res.send("Delete One POST");
};
