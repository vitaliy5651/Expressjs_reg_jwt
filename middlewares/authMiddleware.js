import tokensService from '../services/tokens.service.js'

const auth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(res.status(401).json({ message: 'Вы не вошли в систему' }))
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(res.status(401).json({ message: 'Пользователь не авторизован' }))
    }
    const userData = tokensService.validateAccessToken(accessToken)
    if (!userData) {
      return next(res.status(401).json({ message: 'Ошибка при валидации токена' }))
    }
    req.user = userData
    next()
  } catch {
    res.status(401).send('Неверный токен')
  }
}

export default auth
