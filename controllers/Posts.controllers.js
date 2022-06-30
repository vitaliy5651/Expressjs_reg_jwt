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
        const Userpost = await PostsService.CreatePostUser(req.body, {
          video: req.files.videoOfPosts[0].path,
          image: req.files.postsImages[0].path
        })
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

  updatePost = async (req, res) => {
    try {
      if (req.files.videoOfPosts && req.files.postsImages) {
        const Updatepost = await PostsService.UpdatePostUser(req.body, {
          video: req.files.videoOfPosts[0].path,
          image: req.files.postsImages[0].path
        })
        res.status(200).json(Updatepost)
      } else if (req.files.videoOfPosts) {
        const Updatepost = await PostsService.UpdatePostUser(req.body, { video: req.files.videoOfPosts[0].path })
        res.status(200).json(Updatepost)
      } else if (req.files.postsImages) {
        const Updatepost = await PostsService.UpdatePostUser(req.body, { image: req.files.postsImages[0].path })
        res.status(200).json(Updatepost)
      } else {
        const Updatepost = await PostsService.UpdatePostUser(req.body)
        res.status(200).json(Updatepost)
      }
    } catch (e) {
      res.status(400).json(e)
    }
  }

  deletePost = async (req, res) => {
    const Deletepost = await PostsService.DeletePostUser(req.body)
    try {
      res.status(200).json(Deletepost)
    } catch (e) {
      res.status(400).json(e)
    }
  }
}

export default new PostsControllers()
