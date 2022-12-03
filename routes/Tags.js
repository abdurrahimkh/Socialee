const express = require('express');
const router = express.Router();

const TagsController = require('./../controllers/TagsController');
const TagValidations = require('../validators/TagValidations');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', TagsController.getAll);
router.get('/:slug', TagsController.getOne);
router.post(
  '/',
  AuthMiddleware.requireLogin,
  TagValidations.create,
  TagsController.create
);
router.patch('/:slug', TagsController.updateOne);
router.delete('/:slug', TagsController.delete);

module.exports = router;
