import { PrismaClient } from "@/app/generated/prisma"
const prisma = new PrismaClient()
import CrudRepository from "./crudrepository";
import { Prisma } from "@/app/generated/prisma";
class bookingrepository extends CrudRepository{
    constructor(){
        super('booking')
    }
    async bookseat(data){
        try {
            console.log(data,"this is the data from the first of the repositroy")
            return await prisma.$transaction( async (tx)=>{
                
                
                let [flights] = await prisma.$queryRaw(Prisma.sql `SELECT * FROM Flight WHERE id = ${data.flight_id} FOR UPDATE;`)
                console.log(flights , "this is the flights data which i have the got from ")
                if(!flights || flights.avaliable_seats<=0){
                    throw Error('No seats avaliable')

                }
                console.log(flights, "this is the flights")
                await tx.flight.update({
                    where:{
                        id:flights.id
                    },
                    data:{
                        avaliable_seats:{
                            decrement:data.total_seats_booked
                        }
                    }
                })
                const total_price = flights.price * data.total_seats_booked
                let booking = await tx.booking.create({
                    data:{
                        user_id:data.user_id,
                        flight_id:data.flight_id,
                        total_seats_booked:data.total_seats_booked,
                        total_price:total_price
                    },

                })
                
                return booking
            })
        } catch (error) {
            console.log(error , "this is the error")
            throw error
        }

    }
}
export default bookingrepository