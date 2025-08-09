import bookingrepository from "../repository/bookingrepository"
const bookingservice = new bookingrepository()
export async function NewBookingService(data) {
    try {
        console.log(data,"from the service layer")
        const newbooking = await bookingservice.bookseat(data)
        return newbooking
    } catch (error) {
        throw error
    }
    
}