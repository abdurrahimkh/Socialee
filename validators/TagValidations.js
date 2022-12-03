const validator = require('express-validator');

exports.create = [
  validator.check('title', 'A post must have a title').notEmpty(),
];
