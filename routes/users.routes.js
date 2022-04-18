import { Router } from 'express';
import userControllers from '../controllers/users.controllers.js'
import auth from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validators.js';
import multer from '../middlewares/upload.js'

const router =  Router()

router.post('/reg',multer,validate(), userControllers.registerUser)
router.post('/login',validate(), userControllers.login)
router.put('/update',multer,auth, userControllers.put)
router.delete('/delete',auth, userControllers.delete)

export default router