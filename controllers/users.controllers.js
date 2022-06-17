import userService from '../services/user.service.js'

class UserControllers {
  get = async (req, res) => {
    const result = await userService.getAll()
    res.status(200).json(result)
  }

  getLoginUser = async (req, res) => {
    try {
      const result = await userService.getOne(req.params.email)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: 'Пользователь не найден' })
    }
  }

  refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies
      const result = await userService.getNewToken(refreshToken)
      res.cookie('refreshToken', result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  registrationUser = async (req, res) => {
    try {
      const result = await userService.register(req.body)
      res.cookie('refreshToken', result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json(result)
    } catch (e) {
      console.log(e)
      const result = await userService.register(req.body)
      res.status(400).json({ message: result })
    }
  }

  login = async (req, res) => {
    try {
      const result = await userService.login(req.body)
      res.cookie('refreshToken', result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json(result)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Ошибка входа' })
    }
  }

  put = async (req, res) => {
    try {
      const result = await userService.put(req.body, req.file.path)
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Обновление прошло успешно' })
      } else {
        res.status(400).json({ message: 'Ошибка обновления' })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Error' })
    }
  }

  delete = async (req, res) => {
    try {
      const result = await userService.delete(req.body)
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Удаление прошло успешно' })
      } else {
        res.status(400).json({ message: 'Ошибка удаления' })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Error' })
    }
  }
}

const userControllers = new UserControllers()

export default userControllers
