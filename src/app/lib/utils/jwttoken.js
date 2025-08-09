var jwt = require('jsonwebtoken');
export function createToken(payload){
    
    const token = jwt.sign(payload,process.env.JWT_SECERT,{expiresIn:'1h'})
    return {token:token}
}

export function verifyToken(token){
    try {
        const payload = jwt.verify(token,process.env.JWT_SECERT)
        return payload
    } catch (error) {
        throw error
    }

}

