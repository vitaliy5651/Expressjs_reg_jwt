import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'postsImages') {
      cb(null, 'assets/images/ImageOfPosts')
    } else if (file.fieldname === 'avatar') {
      cb(null, 'assets/images/avatars')
    } else if (file.fieldname === 'videoOfPosts') {
      cb(null, 'assets/images/videoOfPosts')
    }
  },
  filename: (req, file, cb) => {
    const arr = file.originalname.split('.')
    cb(null, uuidv4() + '.' + arr[arr.length - 1])
  }
})

// const types = ['image/png', 'image/jpeg', 'image/jpg']

export default multer({ storage: storageConfig })
