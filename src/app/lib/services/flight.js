import flightrepository from "../repository/flightrepository";
const fligtservice = new flightrepository()
export async function  GetAllFligtServices(searchParams={}) {
    const query = {where:{},orderBy:{}}
    console.log(searchParams , "these are the search params");
    
    if(searchParams.get("arrival_airport_id")){
        const arrival_airport_id = Number(searchParams.get("arrival_airport_id"))
        query.where.arrival_airport_id = arrival_airport_id

    }
    if(searchParams.get("departure_airport_id")){
        const departure_airport_id = Number(searchParams.get("departure_airport_id"))
        query.where.departure_airport_id= departure_airport_id
    }
    if(searchParams.get("sort")){
        const sort = searchParams.get("sort")
        query.orderBy={
            
                price:sort
            
        }
    }
    console.log(query  ,"this is from the query service")
    return await fligtservice.getAllAirportAndFlights(query)
}
export async function CreateNewFlightServices(data) {
    try {
        const flights = await fligtservice.create(data)
        return flights
    } catch (error) {
        throw error
    }
}


