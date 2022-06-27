import PostsService from '../services/Posts.service.js'

class PostsControllers {
  getAll = async (req, res) => {
    const posts = await PostsService.getAllPosts()
    try {
      res.status(200).json(posts)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  createPost = async (req, res) => {
    const Userpost = await PostsService.CreatePostUser(req.body, req.file.path)
    try {
      console.log('enter')
      res.status(200).json(Userpost)
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

export default new PostsControllers()
