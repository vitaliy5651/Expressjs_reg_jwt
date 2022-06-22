import express from 'express'
import serverRoutes from './routes/users.routes.js'
import connect from './Connect/connect.js'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT ?? 5000
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

app.use('/assets/images', express.static(path.join(__dirname, '/assets/images')))
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(express.json())
app.use('/', serverRoutes)

connect.then(() => {
  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
  })
})
