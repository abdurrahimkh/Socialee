const validator = require('express-validator');

const Tag = require('./../models/Tag');

exports.getAll = async (req, res) => {
  try {
    const tags = await Tag.find().sort('-createdAt');

    res.status(200).json({
      status: 'success',
      data: {
        tags,
      },
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error fetching tags !',
      },
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { slug } = req.params;

    const tag = await Tag.findOne({ slug }).populate('posts');

    if (!tag) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Tag not found !',
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tag,
      },
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error fetching one tag !',
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
          message: 'Tag creation failed !',
          errors: errors.array(),
        },
      });
    }

    const { title } = req.body;
    const tag = await Tag.create({ title });

    res.status(201).json({
      status: 'success',
      data: {
        tag,
      },
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error creating tag !',
      },
    });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { slug } = req.params;

    const tag = await Tag.findOne({ slug });

    if (!tag) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Tag not found !',
        },
      });
    }

    tag.title = req.body.title;
    await tag.save({ validateBeforeSave: false });

    res.status(200).json({
      status: 'success',
      data: {
        tag,
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

exports.delete = async (req, res) => {
  try {
    const { slug } = req.params;

    const tag = await Tag.findOne({ slug });

    if (!tag) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Tag not found !',
        },
      });
    }

    await tag.remove();

    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    console.warn('Error: ', error);

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error deleting tag !',
      },
    });
  }
};
