/* eslint-disable import/no-duplicates */
import express from 'express'
import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import PostsControllers from '../controllers/Posts.controllers.js'
import multer from '../middlewares/upload.js'
import { fileURLToPath } from 'url'
import path from 'path'

const routerOfPosts = Router()
const app = express()

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

app.use('/assets/images', express.static(path.join(__dirname, '/assets/images/ImageOfPosts')))

routerOfPosts.get('/getAllPosts', auth, PostsControllers.getAll)
routerOfPosts.post('/createPost', multer().fields([{ name: '' }]), PostsControllers.createPost)
routerOfPosts.put('/updatePost')

export default routerOfPosts
