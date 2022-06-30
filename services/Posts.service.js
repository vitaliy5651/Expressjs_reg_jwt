import PostModel from '../Model/PostsModel.js'
import UserModel from '../Model/Usermodel.js'

class PostsService {
  getAllPosts = async () => {
    const posts = await PostModel.find()
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
    const post = await PostModel.create({
      user: user.id,
      likes: body.likes,
      description: body.description,
      imageOfPost: files.image,
      videoOfPost: files.video
    })
    return { post }
  }

  UpdatePostUser = async (body, files) => {
    if (files) {
      const post = await PostModel.updateOne({ id: body.id }, { $set: body, imageOfPost: files.image, videoOfPost: files.video, Created: Date.now() })
      return post
    } else {
      const post = await PostModel.updateOne({ id: body.id }, { $set: body, imageOfPost: null, videoOfPost: null, Created: Date.now() })
      return post
    }
  }

  DeletePostUser = async (body) => {
    const post = await PostModel.deleteOne({ id: body.id })
    return post
  }
}

export default new PostsService()
