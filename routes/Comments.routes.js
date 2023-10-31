import { Router } from 'express'
import CommentsControllers from '../controllers/Comments.controllers.js'
import auth from '../middlewares/authMiddleware.js'

const routerOfComments = Router()

routerOfComments.get('/get', auth, CommentsControllers.getAllComments)
routerOfComments.post('/post', CommentsControllers.addComment)
routerOfComments.put('/put', auth)
routerOfComments.delete('/delete', auth)

export default routerOfComments
