import mongoose from 'mongoose'
const { Schema } = mongoose

const PostsSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
  likes: { type: Number },
  Created: { type: Date, default: Date.now },
  comments: [{
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: { type: String }
  }],
  imageOfPost: { type: String },
  videoOfPost: { type: String }
})

export default mongoose.model('Posts', PostsSchema)
