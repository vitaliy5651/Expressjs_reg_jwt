import jsonwebtoken from "jsonwebtoken";

const auth = async (req, res, next) =>{
    const [strategy, token] = req.header('Authorization').split(" ")
    const result = jsonwebtoken.verify(token, 'secret')
    req.login = result.login
    try{
        next()
    }catch{
        res.status(400).send('Неверный токен')
    }
}


export default auth