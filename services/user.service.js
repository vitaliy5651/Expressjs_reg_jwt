import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import tokensService from './tokens.service.js'
import { UserDtos } from '../dtos/users.dtos.js'
import PostsService from './Posts.service.js'
import UserModel from '../Model/Usermodel.js'

class UserService {
  tokenModel = mongoose.model('Token')
  getAll = () => {
    return UserModel.find()
  }

  getOne = async (Useremail) => {
    const user = await UserModel.findOne({ email: Useremail })
    const refreshToken = await tokensService.findTokenbyid(user.id)
    return { refreshToken, user }
  }

  getNewToken = async (refreshToken) => {
    if (!refreshToken) {
      return 'Пользователь не авторизован'
    }
    const result = tokensService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokensService.findToken(refreshToken)
    if (!result || !tokenFromDB) {
      return 'Произошла ошибка при авторизации'
    }
    const user = await UserModel.findById(result.id)
    const userDtos = new UserDtos(user)
    const tokens = tokensService.generateTokens({ ...userDtos })
    await tokensService.saveToken(userDtos.id, tokens.refreshToken)
    return { ...tokens, user }
  }

  register = async (body) => {
    const candidate = await UserModel.findOne({ email: body.email })
    if (candidate) {
      return `Пользователь с email ${body.email} уже существует`
    }
    const user = await UserModel.create(
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
    const user = await UserModel.find({ email: body.email })
    const validPassword = await bcrypt.compare(body.password, user[0].password)
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

  updateUser = async (body, file) => {
    console.log(body)
    if (body.password !== '') {
      const salt = bcrypt.genSaltSync()
      body.password = bcrypt.hashSync(body.password, salt)
    } else {
      const user = await UserModel.findById({ _id: body.id })
      body.password = user.password
      console.log(body.password)
    }
    if (file) {
      const user = await UserModel.updateOne({ _id: body.id }, { $set: body, avatar: file })
      return user
    } else {
      const user = await UserModel.updateOne({ _id: body.id }, { $set: body, avatar: null })
      console.log(user)
      return user
    }
  }

  delete = async (body) => {
    await PostsService.deleteAllPostsofUsers(body.id)
    const token = await tokensService.deleteToken(body.id)
    if (!token) {
      return 'Ошибка удаления пользователя'
    }
    return await UserModel.deleteOne({ _id: body.id })
  }
}

const userService = new UserService()

export default userService
