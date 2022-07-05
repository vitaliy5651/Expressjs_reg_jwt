import mongoose from 'mongoose'
const { Schema } = mongoose

const PostsSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  Created: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  imageOfPost: { type: String },
  videoOfPost: { type: String }
})

export default mongoose.model('Posts', PostsSchema)
