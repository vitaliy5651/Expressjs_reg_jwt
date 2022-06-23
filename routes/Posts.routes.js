import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import PostsControllers from '../controllers/Posts.controllers.js'

const routerOfPosts = Router()

routerOfPosts.get('/getAllPosts', auth, PostsControllers.getAll)
routerOfPosts.post('/createPost', PostsControllers.createPost)
routerOfPosts.put('/updatePost')
