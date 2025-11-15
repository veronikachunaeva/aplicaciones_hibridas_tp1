import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  tel: String,
  avatar: String,
  rol:{
      type: String,
      enum: ['cliente', 'admin'],
      default: 'cliente'
  },
});

const User = mongoose.model('User', schema);

export default User;