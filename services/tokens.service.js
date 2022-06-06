import jsonwebtoken from "jsonwebtoken"
import TokenModel from "../Model/TokenModel.js"

class TokenService {
    
    generateTokens = (payload) => {
        const AccessToken =  jsonwebtoken.sign(payload, 'secret', {expiresIn: '30m'})
        const refreshToken = jsonwebtoken.sign(payload, 'refreshsecret', {expiresIn: '30d'})

        return {AccessToken, refreshToken}
    }
    
    saveToken = async (userId, refreshToken) => {
        const TokenData = await TokenModel.findOne({user: userId})
        if (TokenData) {
            TokenData.refreshToken = refreshToken;
            return TokenData.save()
        }
        const token = await TokenModel.create({user: userId, refreshToken})
        return token
    }
}

export default new TokenService()