import jsonwebtoken from "jsonwebtoken"
import TokenModel from "../Model/TokenModel.js"

class TokenService {
    
    generateTokens = (payload) => {
        const AccessToken =  jsonwebtoken.sign(payload, 'secret', {expiresIn: '15m'})
        const refreshToken = jsonwebtoken.sign(payload, 'refreshsecret', {expiresIn: '30d'})

        return {AccessToken, refreshToken}
    }

    validateAccessToken = (token) => {
        try {
            const result = jsonwebtoken.verify(token, 'secret')
            return result
        } catch (e) {
            return null
        }
    }

    validateRefreshToken = (token) => {
        try {
            const result = jsonwebtoken.verify(token, 'refreshsecret')
            return result
        } catch (e) {
            return null
        }
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
    findToken =  async (refreshToken) => {
        const token = await TokenModel.findOne({refreshToken})
        return token
    }
}

export default new TokenService()