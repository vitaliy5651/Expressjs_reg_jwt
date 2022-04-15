import { Router } from 'express';
import userControllers from '../controllers/users.controllers.js'
import auth from '../middlewares/authMiddleware.js';

const router =  Router()

router.post('/reg', userControllers.registerUser)
router.post('/login', userControllers.login)
router.put('/update',auth, userControllers.put)
router.delete('/delete',auth, userControllers.delete)

export default router