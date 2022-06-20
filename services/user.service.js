import '../Model/Usermodel.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import tokensService from './tokens.service.js'
import { UserDtos } from '../dtos/users.dtos.js'

class UserService {
  userModel = mongoose.model('User')
  tokenModel = mongoose.model('Token')
  getAll = () => {
    return this.userModel.find()
  }

  getOne = async (Useremail) => {
    const user = this.userModel.findOne({ email: Useremail })
    return user
  }

  getNewToken = async (refreshToken) => {
    if (!refreshToken) {
      return 'Пользователь не авторизован'
    }
    const result = tokensService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokensService.findToken(refreshToken)
    console.log(tokenFromDB)
    if (!result || !tokenFromDB) {
      return 'Произошла ошибка при авторизации'
    }
    const user = await this.userModel.findById(result.id)
    const userDtos = new UserDtos(user)
    const tokens = tokensService.generateTokens({ ...userDtos })
    await tokensService.saveToken(userDtos.id, tokens.refreshToken)
    return { ...tokens, user }
  }

  register = async (body) => {
    const candidate = await this.userModel.findOne({ email: body.email })
    if (candidate) {
      return `Пользователь с email ${body.email} уже существует`
    }
    const user = await this.userModel.create(
      {
        FirstName: body.FirstName,
        LastName: body.LastName,
        login: body.login,
        email: body.email,
        password: body.password
      })
    user.save()
    const userDtos = new UserDtos(user)
    const tokens = tokensService.generateTokens({ ...userDtos })
    await tokensService.saveToken(userDtos.id, tokens.refreshToken)
    return { ...tokens, user }
  }

  login = async (body) => {
    const user = await this.userModel.find({ email: body.email })
    console.log(user[0].password)
    console.log(body.password)
    const validPassword = await bcrypt.compare(body.password, user[0].password)
    console.log(validPassword)
    if (!user) {
      return 'Такого пользователя не существует!'
    } else if (!validPassword) {
      return 'Неверный пароль'
    } else {
      const userDtos = new UserDtos(user[0])
      const tokens = tokensService.generateTokens({ ...userDtos })
      await tokensService.saveToken(userDtos.id, tokens.refreshToken)
      return { ...tokens, user }
    }
  }

  put = async (body, file) => {
    const user = await this.userModel.updateOne({ email: body.email }, { $set: body, avatar: file })
    return user
  }

  delete = (body) => {
    return this.userModel.deleteOne({ login: body.login })
  }
}

const userService = new UserService()

export default userService
