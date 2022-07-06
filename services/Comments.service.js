import CommentsModel from '../Model/CommentsModel.js'
import PostModel from '../Model/PostsModel.js'
// import UserModel from '../Model/Usermodel.js'

class CommentsService {
  getComments = async () => {
    const comment = await CommentsModel.find().populate('authorId')
    return comment
  }

  createComment = async (body) => {
    const comment = await CommentsModel.create({
      post: body.postId,
      authorId: body.userId,
      content: body.content
    })
    const post = await PostModel.updateOne({ _id: body.postId }, { $push: { comments: comment._id } })
    console.log(post)
    return comment.populate('authorId')
  }

  updateComment = async (body) => {
    const comment = await CommentsModel.updateOne({ _id: body.id }, { $set: { content: body.content } })
    return comment
  }

  deleteComment = async (body) => {
    const comment = await CommentsModel.deleteOne({ _id: body.id })
    return comment
  }
}

export default new CommentsService()
