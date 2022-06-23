import mongoose from 'mongoose'

class PostsService {
  postsModel = mongoose.model('Posts')

  getAllPosts = async () => {
    const posts = await this.postsModel.find()
    return posts
  }

  CreatePostUser = async (body) => {
    const post = await this.postsModel.create({
      user: body.id,
      likes: body.likes,
      description: body.description
    })
    return post
  }
}

export default PostsService()
