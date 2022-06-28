import PostModel from '../Model/PostsModel.js'
import UserModel from '../Model/Usermodel.js'

class PostsService {
  getAllPosts = async () => {
    const posts = await PostModel.find()
    return posts
  }

  getTimeLinePost = async (userId) => {
    const posts = await PostModel.find({ user: userId })
    return posts
  }

  CreatePostUser = async (body, files) => {
    const user = await UserModel.findById(body.user)
    // const author = await UserModel.findById(body.comments.authorId)
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
}

export default new PostsService()
