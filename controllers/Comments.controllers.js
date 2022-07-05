import CommentsService from '../services/Comments.service.js'

class CommentsControllers {
  getAllComments = async (req, res) => {
    const AllComments = await CommentsService.getComments()
    res.status(200).json(AllComments)
  }

  addComment = async (req, res) => {
    const comment = await CommentsService.createComment(req.body)
    try {
      res.status(200).json(comment)
    } catch (error) {
      res.status(404).json({ message: error })
    }
  }
}

export default new CommentsControllers()