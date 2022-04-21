//import {users} from '../data/users.js'
import User from "../Model/model.js"
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"



const generateAccessToken = (id, login) => {
    const payload ={
        id, login
    }
    return jsonwebtoken.sign(payload, 'secret', {expiresIn: '24h'})
}

class UserService {
getAll = () => {
    return User.findAll({attributes: ['id', 'login', 'email','photo']})
}
getOne = (key) =>{
    return User.findOne({attributes:{exclude:['password', 'createdAt', 'updatedAt']},where:{id: key}}) 
}
register = (body, file) =>{
    let salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);
    return User.create({
        id: body.id,
        login: body.login,
        email: body.email,
        password: body.password,
        photo: file
    })
}
login = async (body) =>{
    const user = await User.findOne({where: {login: body.login}})
    if(!user){
        return 'Такого пользователя не существует!'
    }
    const validPassword = await bcrypt.compare(body.password, user.password)
    if(!validPassword){
        return 'Invalid password'
    }else{
        const token = generateAccessToken(user.id, user.login)
        return token
    }
}

updateUser = (body) =>{
    let salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);
    return User.update(body, {where:{login: body.login}})
}
deleteUser = (body) =>{
    return User.destroy({where:{login: body.login}})
}
}

let userService = new UserService()


export default userService 

