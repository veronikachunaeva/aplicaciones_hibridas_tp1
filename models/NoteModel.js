import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', schema);
export default Note;
