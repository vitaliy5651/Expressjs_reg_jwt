import PostModel from '../Model/postsModel.js'
import UserModel from '../Model/usermodel.js'
import CommentsService from './comments.service.js'

class PostsService {
  getAllPosts = async () => {
    const posts = await PostModel.find().populate('user')
    return posts
  }

  getTimeLinePost = async (userId) => {
    const posts = await PostModel.find({ user: userId }).populate('user')
    return posts
  }

  CreatePostUser = async (body, files) => {
    const user = await UserModel.findById(body.user)
    if (!user) {
      return 'Пользователь не найден'
    }
    if (files) {
      const post = await PostModel.create({
        user: user.id,
        likes: body.likes,
        description: body.description,
        imageOfPost: files.image,
        videoOfPost: files.video
      })
      return { post }
    } else {
      const post = await PostModel.create({
        user: user.id,
        likes: body.likes,
        description: body.description,
        imageOfPost: null,
        videoOfPost: null
      })
      return post
    }
  }

  UpdatePostUser = async (body, files) => {
    if (files) {
      const post = await PostModel.updateOne(
        { _id: body.id },
        {
          $set: body,
          imageOfPost: files.image,
          videoOfPost: files.video,
          Created: Date.now()
        }
      )
      return post
    } else {
      const post = await PostModel.updateOne(
        { _id: body.id },
        { $set: body, imageOfPost: null, videoOfPost: null, Created: Date.now() }
      )
      return post
    }
  }

  SetLikesPost = async (body) => {
    const postUpdate = await PostModel.updateOne(
      { _id: body.id },
      { $addToSet: { likes: body.likes } }
    )
    return postUpdate
  }

  DeletePostUser = async (body) => {
    const post = await PostModel.findOneAndDelete({ _id: body.id })
    return post
  }

  deleteAllPostsofUsers = async (userId) => {
    await CommentsService.deleteAllCommentsUser(userId)
    const post = await PostModel.deleteMany({ user: userId })
    return post
  }
}

export default new PostsService()
