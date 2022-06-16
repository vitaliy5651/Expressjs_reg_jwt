import tokensService from '../services/tokens.service.js'

const auth = async (req, res, next) =>{
    try{
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            res.status(400).json({message: 'Вы не вошли в систему'})
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken){
            res.status(400).json({message: 'Пользователь не авторизован'})
        }
        const userData = tokensService.validateAccessToken(accessToken)
        if(!userData){
            res.status(400).json({message: 'Ошибка при валидации токена'})
        }
        next()
    }catch{
        res.status(400).send('Неверный токен')
    }
}


export default auth