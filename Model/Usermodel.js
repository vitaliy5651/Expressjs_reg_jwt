import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userShema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  login: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    set: value => bcrypt.hashSync(value, 10, bcrypt.genSaltSync())
  },
  avatar: { type: String }
}, { versionKey: false })

export default mongoose.model('User', userShema)
