import airportrepository from "../repository/airportrepository";
const airportservice = new airportrepository()
export async function GetAllAirportService() {
    return await airportservice.getAll()
}
export async function CreateNewAirportService(data) {
    console.log(data , "this is the data")
    return await airportservice.create(data)
}

