import express from 'express';
import serverRoutes from './routes/users.routes.js'
import connect from './Connect/connect.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()
const PORT = process.env.PORT ?? 5000;
app.use(cookieParser())
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json())
app.use('/', serverRoutes)


connect.then(() => {
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}...`)
    })
})



