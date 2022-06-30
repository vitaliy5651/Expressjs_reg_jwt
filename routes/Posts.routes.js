/* eslint-disable import/no-duplicates */
import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import PostsControllers from '../controllers/Posts.controllers.js'
import multer from '../middlewares/upload.js'

const routerOfPosts = Router()

routerOfPosts.get('/getAllPosts', auth, PostsControllers.getAll)
routerOfPosts.get('/getTimeLinePost/:id', auth, PostsControllers.TimeLinePosts)
routerOfPosts.post('/createPost', auth, multer.fields([
  {
    name: 'videoOfPosts',
    maxCount: 1
  },
  {
    name: 'postsImages',
    maxCount: 1
  }
]), PostsControllers.createPost)
routerOfPosts.put('/updatePost', multer.fields([
  {
    name: 'videoOfPosts',
    maxCount: 1
  },
  {
    name: 'postsImages',
    maxCount: 1
  }
]), PostsControllers.updatePost)
routerOfPosts.delete('/deletePost', auth, PostsControllers.deletePost)

export default routerOfPosts
