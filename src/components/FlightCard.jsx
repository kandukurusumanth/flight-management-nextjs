import axios from "axios";

function FlightCard({ flight }) {
 
  const handleBooking =async ()=>{
    console.log(flight.id , "this is the flight id of the booked")
    try {
      const respone = await axios.post('/api/booking',{
        flight_id:flight.id,
        total_seats_booked:1,
        user_id:1,

      })
      if(respone){
        alert('your seats are been booked')

      }
    } catch (error) {
      console.log(error,"this is the error message" , error.message)
      alert('error while booking the flight seaats', error.message)
    }
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition hover:shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-blue-700">
            {flight.departureAirport.city} ({flight.departureAirport.airport_name})
            {" → "}
            {flight.arrivalAirport.city} ({flight.arrivalAirport.airport_name})
          </h2>
          <p className="text-sm text-gray-600">
            Available Seats:{" "}
            <span className="font-medium">
              {flight.avaliable_seats} / {flight.total_seats}
            </span>
          </p>
        </div>

        <div className="text-right mt-4 md:mt-0">
          <p className="text-xl font-bold text-green-600 mb-1">₹ {flight.price}</p>
          <button onClick={handleBooking} className=" cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
export default FlightCard