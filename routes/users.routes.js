import { Router } from 'express';
import userControllers from '../controllers/users.controllers.js'
import auth from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validators.js';
import multer from '../middlewares/upload.js'

const router =  Router()

router.get('/', userControllers.get)
router.get('/:id', userControllers.getOne)
router.post('/reg',multer,validate(), userControllers.registerUser)
router.post('/login',validate(), userControllers.login)
<<<<<<< HEAD
router.put('/update',validate(),auth, userControllers.put)
=======
router.put('/update',multer,auth, userControllers.put)
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5
router.delete('/delete',auth, userControllers.delete)

export default router