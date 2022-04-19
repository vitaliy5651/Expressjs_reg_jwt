import express from 'express';
import serverRoutes from './routes/users.routes.js'
<<<<<<< HEAD
import connect from './Connect/connect.js';
=======
import sequelize from './Connect/connect.js';
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5

const app = express()



const PORT = process.env.PORT ?? 4200;

app.use(express.json())
app.use('/', serverRoutes)


<<<<<<< HEAD
connect.then(() => {
=======
sequelize.sync().then(() => {
>>>>>>> 8f73bb5ff5b460b4937bc5220dc30b06170b36c5
    app.listen(PORT, () =>{
        console.log(`Server has been started on port ${PORT}...`)
    })
})

