import userrepository from "../repository/userrepository";
import { checkPassword, hashPassword } from "../utils/bcrypt_utils";
import HttpRespone from "../utils/custom_error";
import { createToken } from "../utils/jwttoken";
const userservice = new userrepository()
export async function GetAllUserService(data) {
    try {

        const users = await userservice.getAll(data)
        
        return users
    } catch (error) {
        throw error
    }
}
export async function CreateNewUserService(data) {
    try {
        console.log(data, "this is the data we have got from the user")
        const hashed_password = hashPassword(data.password)
        data.password=hashed_password
        const users = await userservice.create(data)
        if(users){
            const payload = {id:users.id,name:users.name,email:users.emai,role:users.role}
            return createToken(payload)
        }
        else{
            throw Error('error while creating the user')
        }
    } catch (error) {
        throw error
    }
    
}
export async function GetUserByIdService(id) {
    try {
        const user = await userservice.getById(id)
        return user
    } catch (error) {
        throw error
    }
    
}
export async function loginService(data) {
    try {
        
        const isLogin = await userservice.loginRepository(data.email)
        
        if(isLogin){
            if(checkPassword(data.password,isLogin.password)){
                const payload = {id:isLogin.id,email:isLogin.email,role:isLogin.role,name:isLogin.name}
                return createToken(payload)
            }
            throw new HttpRespone("Email and Password doesn't match",401)
        }

    } catch (error) {

        throw error
    }
}


