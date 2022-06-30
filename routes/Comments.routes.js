import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'

const routerOfComments = Router()

routerOfComments.get('/get', auth)
routerOfComments.post('/CreateComment', auth)
routerOfComments.put('/updateComment', auth)

export default routerOfComments
