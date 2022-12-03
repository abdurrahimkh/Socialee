const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

tagSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

tagSchema.pre('remove', function (next) {
  this.model('Post').updateMany(
    { tags: this._id },
    { $pull: { tags: this._id } },
    { multi: true },
    next
  );
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
