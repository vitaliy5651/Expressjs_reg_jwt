import mongoose from 'mongoose'
const { Schema } = mongoose

const PostsSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
  likes: { type: Number },
  dateOfCreatePosts: { type: Date },
  comments: [{
    userComment: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    type: String
  }],
  imageOfPost: { type: String }
})

export default mongoose.model('Posts', PostsSchema)
