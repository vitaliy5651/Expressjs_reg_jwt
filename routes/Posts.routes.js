/* eslint-disable import/no-duplicates */
import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import PostsControllers from '../controllers/posts.controllers.js'
import multer from '../middlewares/upload.js'

const routerOfPosts = Router()

routerOfPosts.get('/get', auth, PostsControllers.getAll)
routerOfPosts.get('/getOne/:id', auth, PostsControllers.TimeLinePosts)
routerOfPosts.post('/post', auth, multer.fields([
  {
    name: 'videoOfPosts',
    maxCount: 1
  },
  {
    name: 'postsImages',
    maxCount: 1
  }
]), PostsControllers.createPost)
routerOfPosts.put('/update', multer.fields([
  {
    name: 'videoOfPosts',
    maxCount: 1
  },
  {
    name: 'postsImages',
    maxCount: 1
  }
]), auth, PostsControllers.updatePost)
routerOfPosts.put('/put', PostsControllers.setLikes)
routerOfPosts.delete('/delete', auth, PostsControllers.deletePost)

export default routerOfPosts
