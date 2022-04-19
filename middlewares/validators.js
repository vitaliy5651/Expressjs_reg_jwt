import Joi from "joi"

const userShema = Joi.object({
    login: Joi.string().min(3).required().alphanum(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required()
})

const validate = (shema) => async (req, res, next) => {
    shema = userShema
    try {
        await shema.validateAsync(req.body)
        next()
    } catch (e) {
        res.status(400).send(e.details)
    }
}

export default validate