const mongoose = require("mongoose");
const { Schema } = mongoose;
const slugify = require("slugify");

const postSchema = new Schema(
  {
    title: { type: String, unique: true },
    slug: { type: String, unique: true },
    body: String,
    coverImage: String,
    images: [String],
    isDraft: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
