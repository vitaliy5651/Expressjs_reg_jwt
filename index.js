import express from 'express';
import serverRoutes from './routes/users.routes.js'
import connect from './Connect/connect.js';

const app = express()



const PORT = process.env.PORT ?? 4200;

app.use(express.json())
app.use('/', serverRoutes)


connect.then(() => {
    app.listen(PORT, () =>{
        console.log(`Server has been started on port ${PORT}...`)
    })
})

