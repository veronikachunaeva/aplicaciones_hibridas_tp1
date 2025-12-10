import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  link: String,
  comment: String,
  description: String,
  icon: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }
});

const Link  = mongoose.model('Link', schema);

export default Link;
