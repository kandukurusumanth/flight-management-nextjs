import CrudRepository from "./crudrepository"
import { PrismaClient } from "@/app/generated/prisma"
const prisma = new PrismaClient()
class flightrepository extends CrudRepository{
    constructor(){
        super('flight')
    }
    async getAllAirportAndFlights(query={}){
        
        console.log(query , "this is th query service")
        try {
            const response = await prisma.flight.findMany({
                ...query,
                include:{
                    arrivalAirport:true,
                    departureAirport:true
                }
            })
            return response
        } catch (error) {
            throw error
        }
    }
}
export default flightrepository