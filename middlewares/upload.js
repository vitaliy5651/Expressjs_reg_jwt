import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === 'imageOfPosts') {
      cb(null, 'assets/images/ImageOfPosts')
    } else if (file.fieldname === 'avatar') {
      cb(null, 'assets/images')
    }
  },
  filename: (req, file, cb) => {
    const arr = file.originalname.split('.')
    cb(null, uuidv4() + '.' + arr[arr.length - 1])
  }
})

// const types = ['image/png', 'image/jpeg', 'image/jpg']

export default multer({ storage: storageConfig }).fields(
  [
    {
      name: 'imageOfPost'
    },
    {
      name: 'avatar'
    }
  ]
)
