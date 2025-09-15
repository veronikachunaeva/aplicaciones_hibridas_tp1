import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = new Schema({
  title: String,
  description: String,
  status: String,
  priority: String,
  createdAt: Date
},
{
  timestamps: true
});

const Note  = mongoose.model('Note', schema);

export default Note;