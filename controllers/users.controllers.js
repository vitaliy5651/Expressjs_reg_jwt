import userService from "../services/user.service.js";

class UserControllers{
    get = async (req,res) =>{
        const result = await userService.getAll()
        res.status(200).json(result)
    }
    getOne = async (req,res) =>{
        const result =await userService.getOne(req.params.id)
        res.status(200).json(result)
    }
    registerUser = async (req, res)=>{
        try{
            const result = await userService.register(req.body, req.file.path)
            if(result){
                res.status(200).json({message: 'Регистрация прошла успешно'})
            }
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка регистрации'})
        }
    }
    login = async(req, res) =>{
        try{
        const result = await userService.login(req.body)
        res.status(200).json(result)
        }
        catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка входа'})
        }
    }
    put = async (req, res) =>{
        try{
            const result = await userService.put(req.body) 
            if(result == 1){
                res.status(200).json({message: 'Обновление прошло успешно'})
            }else{
                res.status(400).json({message: 'Ошибка обновления'})
            }
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Error'})
        }
    }
    delete = async (req, res) =>{
        try{
            const result = await userService.delete(req.body) 
            if(result == 1){
                res.status(200).json({message: 'Удаление прошло успешно'})
            }else{
                res.status(400).json({message: 'Ошибка удаления'})
            }
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Error'})
        }
    }
}



let userControllers = new UserControllers()

//userControllers.post()

export default userControllers
