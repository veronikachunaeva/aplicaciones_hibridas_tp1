import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  tel: String,
  avatar: String,
});

const User = mongoose.model('User', schema);

export default User;