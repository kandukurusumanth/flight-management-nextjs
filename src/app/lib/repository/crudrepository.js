import { PrismaClient } from "@/app/generated/prisma"
const prisma = new PrismaClient()
class CrudRepository{
    constructor(model){
        this.model=model
    }
    async create(data) {
        try {
            const respone = await prisma[this.model].create({
                data:data
            })
            return respone
        } catch (error) {
            throw error
        }
        
    }
    async getAll(data){
        try {
            const respone = await prisma[this.model].findMany()
            return respone
        } catch (error) {
            throw error
        }
    }
    async getById(id){
        try {
            const respone = await prisma[this.model].findUnique({
                where:{
                    id:id
                }
            })
            return respone
        } catch (error) {
            throw error
        }
    }
}

export default CrudRepository