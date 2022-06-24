import PostModel from '../Model/PostsModel.js'
import UserModel from '../Model/Usermodel.js'

class PostsService {
  getAllPosts = async () => {
    const posts = await PostModel.find()
    return posts
  }

  CreatePostUser = async (body, image) => {
    const user = await UserModel.findById(body.userId)
    // const author = await UserModel.findById(body.comments.authorId)
    if (!user) {
      return 'Пользователь не найден'
    }
    const post = await PostModel.create({
      user: user.id,
      likes: body.likes,
      description: body.description,
      imageOfPost: image
    })
    return post
  }
}

export default new PostsService()
