import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  link: String,
  comment: String,
  description: String,
  icon: String,
  group: String
});

const Link  = mongoose.model('Link', schema);

export default Link;
