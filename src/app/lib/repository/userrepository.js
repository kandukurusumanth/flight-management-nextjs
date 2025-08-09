import { PrismaClient } from "@/app/generated/prisma"
const prisma = new PrismaClient()
import CrudRepository from "./crudrepository";
import HttpRespone from "../utils/custom_error";
class userrepository extends CrudRepository{
    constructor(){
        super('user')
    }
    async loginRepository(email){
        try {
            const isLogin = await prisma.user.findUnique({
                where:{
                    email:email
                }
            })
            if(isLogin){
                return isLogin
            }
            throw new HttpRespone("No User found with the Email",404)
           
            
        } catch (error) {
            throw error
        }
    }
}
export default userrepository