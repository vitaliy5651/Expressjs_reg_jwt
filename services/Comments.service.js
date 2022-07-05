import CommentsModel from '../Model/CommentsModel.js'
import PostModel from '../Model/PostsModel.js'
// import UserModel from '../Model/Usermodel.js'

class CommentsService {
  getComments = async () => {
    const comment = await CommentsModel.find()
    return comment
  }

  createComment = async (body) => {
    const comment = await CommentsModel.create({
      authorId: body.userId,
      content: body.content
    })
    const post = PostModel.updateOne({ _id: body.postId }, { $push: { comments: comment._id } })
    return post
  }
}

export default new CommentsService()
