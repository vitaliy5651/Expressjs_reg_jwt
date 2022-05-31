import { Router } from 'express';
import userControllers from '../controllers/users.controllers.js'
import auth from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validators.js';

const router =  Router()


router.get('/', userControllers.get)
router.get('/:id', userControllers.getOne)
router.post('/reg', validate(), userControllers.registerUser)
router.post('/login', validate(), userControllers.login)
router.put('/update', validate(), auth, userControllers.put)
router.delete('/delete', auth, userControllers.delete)

export default router