import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
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