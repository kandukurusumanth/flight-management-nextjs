"use client";
import FlightCard from "@/components/FlightCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Flights() {
  const [passengers, setPassengers] = useState(1);
  const [Flights, setFlights] = useState([]);
  const [FilteredFlights, setFilteredFlights] = useState([]);
  const [FlightsFromFliter, setFlightsFromFliter] = useState([]);
  const [FlightsToFliter, setFlightsToFliter] = useState([]);
  const [FromOnFocus, setFromOnFocus] = useState(false);
  const [toOnFocus, settoOnFocus] = useState(false);
  const [fromAirport, setfromAirport] = useState("");
  const [toAirport, settoAirport] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [arrival_airport_id,setarrival_airport_id] = useState(null)
  const [departure_airport_id,setdeparture_airport_id] = useState(null)
  const [sort,setsort] = useState("asc")
  const [searchdisable,setsearchdisable] = useState(false)
  const [isAdmin,setisAdmin] = useState(false)
   const CheckIsAdmin = ()=>{
    const token = localStorage.getItem("token")
    if(token){
      try {
        const decoded_token = jwtDecode(token)
        
        if(decoded_token.role==="ADMIN"){
          setisAdmin(true)
        }
      } catch (error) {
        
        if(error.name==="InvalidTokenError"){
          alert("invalid Token")
          window.location.href ="/user/login"
        }
        window.location.href="/user/login"
        
      }
    }
    else{
      window.location.href = "/user/login"
    }

  }
  const FlightsData = async () => {
    try {
      const response = await axios.get("/api/flight");
      if (response.data) {
        setFlights(response.data.data);
        setFilteredFlights(response.data.data);
        setFlightsFromFliter(response.data.data);
        setFlightsToFliter(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    FlightsData();
    CheckIsAdmin();
  }, []);

  const handleSearch =async () => {
    console.log(arrival_airport_id,departure_airport_id,"these are from the handle search")
    if(!(arrival_airport_id && departure_airport_id)){
        alert("arrival and departure airport both need to be entred")
        return
        
    }
    console.log(sort,"this is the sort")
    try {
        const response = await axios.get('api/flight',{
            params:{
                arrival_airport_id:arrival_airport_id,
                departure_airport_id:departure_airport_id,
                sort:sort
            }
        })
        console.log(response.data.data , "this is the respone")
        if(response){
            setFlights(response.data.data)

        }
    } catch (error) {
        alert(error.message)
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-10">Flight Search</h1>

      {/* Search Box */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto grid gap-4 md:grid-cols-4">
        {/* From Field */}
        <div className="relative w-full col-span-1">
          <input
            onFocus={() => setFromOnFocus(true)}
            onBlur={() => setTimeout(() => setFromOnFocus(false), 100)}
            value={fromAirport}
            onChange={(e) => {
              setfromAirport(e.target.value);
              const filtered_data = Flights.filter((ele) =>
                ele?.departureAirport?.airport_name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                ele?.departureAirport?.city.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setFlightsFromFliter(filtered_data);
            }}
            type="text"
            placeholder="From"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          {FromOnFocus && (
            <div className="absolute w-full bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto z-20">
              {FlightsFromFliter.map((e) => (
                <div
                  onClick={()=>{
                    setfromAirport(`${e.departureAirport.airport_name} - ${e.departureAirport.city}`)
                    setdeparture_airport_id(e.departureAirport.id)
                }}

                  key={`from-${e.id}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {e.departureAirport.airport_name} - {e.departureAirport.city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* To Field */}
        <div className="relative w-full col-span-1">
          <input
            onFocus={() => settoOnFocus(true)}
            onBlur={() => setTimeout(() => settoOnFocus(false), 100)}
            value={toAirport}
            onChange={(e) => {
              settoAirport(e.target.value);
              const filtered_data = Flights.filter((ele) =>
                ele?.arrivalAirport?.airport_name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) ||
                ele?.arrivalAirport?.city.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setFlightsToFliter(filtered_data);
            }}
            type="text"
            placeholder="To"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          {toOnFocus && (
            <div className="absolute w-full bg-white border border-gray-200 rounded mt-1 max-h-40 overflow-y-auto z-20">
              {FlightsToFliter.map((e) => (
                <div
                  onClick={()=>{
                    settoAirport(`${e.arrivalAirport.airport_name} - ${e.arrivalAirport.city}`)
                    setarrival_airport_id(e.arrivalAirport.id)
                }}
                  key={`to-${e.id}`}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {e.arrivalAirport.airport_name} - {e.arrivalAirport.city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Passengers Field */}
        <input
          type="number"
          min={1}
          value={passengers > 0 ? passengers : 1}
          onChange={(e) => setPassengers(Number(e.target.value))}
          placeholder="Passengers"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        {/* Sort Dropdown */}
        <select
          
          value={sortOrder}
          onChange={(e) => setsort(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="none"  >Sort by</option>
          <option value="asc" >Price (Low to High)</option>
          <option value="desc" >Price (High to Low)</option>
        </select>
      </div>

      {/* Search Button */}
      <div className="mt-4 flex justify-center">
        <button
          
          onClick={handleSearch}
          className=" cursor-pointer mr-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:cursor-not-allowed"
          disabled={searchdisable}
        >
          Search Flights
        </button>
        { isAdmin &&
          <Link href="/flights/create" className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Create New Flight
        </Link>}
      </div>
      

      {/* Flight Cards */}
      <div className="mt-12 max-w-4xl mx-auto space-y-6">
        {Flights.length > 0 ? (
          Flights.map((flight) => <FlightCard flight={flight} key={flight.id} />)
        ) : (
          <p className="text-center text-gray-500">No flights match your search.</p>
        )}
      </div>
    </div>
  );
}
