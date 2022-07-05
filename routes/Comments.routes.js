import { Router } from 'express'
import CommentsControllers from '../controllers/Comments.controllers.js'
import auth from '../middlewares/authMiddleware.js'

const routerOfComments = Router()

routerOfComments.get('/get', auth)
routerOfComments.post('/CreateComment', CommentsControllers.addComment)
routerOfComments.put('/updateComment', auth)
routerOfComments.delete('/deleteComment', auth)

export default routerOfComments