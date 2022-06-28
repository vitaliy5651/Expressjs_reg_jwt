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

  TimeLinePosts = async (req, res) => {
    const posts = await PostsService.getTimeLinePost(req.params.id)
    try {
      res.status(200).json(posts)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  createPost = async (req, res) => {
    try {
      if (req.files.videoOfPosts && req.files.postsImages) {
        const Userpost = await PostsService.CreatePostUser(req.body, { video: req.files.videoOfPosts[0].path, image: req.files.postsImages[0].path })
        res.status(200).json(Userpost)
      } else if (req.files.videoOfPosts) {
        const Userpost = await PostsService.CreatePostUser(req.body, { video: req.files.videoOfPosts[0].path })
        res.status(200).json(Userpost)
      } else if (req.files.postsImages) {
        const Userpost = await PostsService.CreatePostUser(req.body, { image: req.files.postsImages[0].path })
        res.status(200).json(Userpost)
      }
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

export default new PostsControllers()
