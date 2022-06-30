import { Router } from 'express'
import userControllers from '../controllers/users.controllers.js'
import auth from '../middlewares/authMiddleware.js'
import validate from '../middlewares/validators.js'
import multer from '../middlewares/upload.js'

const router = Router()

router.get('/', userControllers.getAllUsers)
router.get('/loginUser/:email', auth, userControllers.getLoginUser)
router.get('/refresh', userControllers.refreshToken)
router.post('/reg', validate(), userControllers.registrationUser)
router.post('/login', userControllers.login)
router.put('/update', auth, multer.single('avatar'), userControllers.put)
router.delete('/delete', auth, userControllers.delete)

export default router
