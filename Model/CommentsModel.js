import mongoose from 'mongoose'
const { Schema } = mongoose

const CommentsSchema = new mongoose.Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Posts' },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: { type: String }
})

export default mongoose.model('Comments', CommentsSchema)
