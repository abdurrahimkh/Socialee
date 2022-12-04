const validator = require('express-validator');
const Tag = require('../models/Tag');
const Post = require('./../models/Post');
const { filterObj } = require('../config/request');

const addTagToPost = async (postId, tag) =>
  Post.findByIdAndUpdate(
    postId,
    { $push: { tags: tag } },
    { new: true, useFindAndModify: false }
  );

const addPostToTag = async (tagId, post) =>
  Tag.findByIdAndUpdate(
    tagId,
    { $push: { posts: post } },
    { new: true, useFindAndModify: false }
  );

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find({ isPublished: true }).sort('-createdAt');

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error getting posts !',
      },
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug })
      .populate('postedBy')
      .populate('tags');

    if (!post) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post not found !',
        },
      });
    }
    post.postedBy.password = undefined;
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error getting post !',
      },
    });
  }
};

exports.create = async (req, res) => {
  try {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post creation failed !',
          errors: errors.array(),
        },
      });
    }

    const filteredObj = filterObj(req.body, 'title', 'body');
    filteredObj.postedBy = req.user._id;

    if (req.files.coverImage && req.files.coverImage.length > 0) {
      filteredObj.coverImage = req.files.coverImage[0].filename;
    }

    if (req.files.images && req.files.images.length > 0) {
      const postImages = req.files.images.map(image => image.filename);
      filteredObj.images = postImages;
    }

    const post = await Post.create(filteredObj);

    if (typeof req.body.tags !== 'undefined' && req.body.tags.length > 0) {
      await Promise.all(
        req.body.tags.map(async tag => addTagToPost(post.id, tag))
      );

      await Promise.all(
        req.body.tags.map(async tag => addPostToTag(tag, post.id))
      );
    }

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error creating post !',
      },
    });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug });
    console.log('POST: ', post);

    if (!post) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post not found !',
        },
      });
    }

    post.title = req.body.title;
    post.body = req.body.body;
    await post.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error updating post !',
      },
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug });

    if (!post) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post not found !',
        },
      });
    }

    await post.remove();

    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error deleting post !',
      },
    });
  }
};
