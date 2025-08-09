"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateFlight() {
  const router = useRouter();
  const [airports, setAirports] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [totalSeats, setTotalSeats] = useState("3");
  const [availableSeats, setAvailableSeats] = useState("1");
  const [price, setPrice] = useState("2");
  const [arrivalAirport_id,setarrivalAirport_id] = useState(null)
  const [departureAirport_id,setdepartureAirport_id]= useState(null)
  async function fetchAirports() {
      try {
        const res = await axios.get("/api/airport");
        if(res?.data?.data){
             setAirports(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    }
  useEffect(() => {
    
    fetchAirports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(arrivalAirport,departureAirport)
      const respone = await axios.post("/api/flight", {
        arrival_airport_id: arrivalAirport,
        departure_airport_id: departureAirport,
        total_seats: Number(totalSeats),
        avaliable_seats: Number(availableSeats),
        price: Number(price),
      });
      console.log(respone)
      if (respone.status === 201) {
        alert("Flight created successfully!");
        window.location.href="/flights"
      }
    } catch (error) {

      alert(`Failed to create flight ${error.response.data.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Create New Flight
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-lg mx-auto p-6 rounded-lg shadow space-y-4"
      >
        
        <div>
          <label className="block mb-1 font-medium">Arrival Airport</label>
          <select
            value={arrivalAirport}
            onChange={(e) => {
                setArrivalAirport(e.target.value)
                
            }}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Arrival Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.airport_name} - {airport.city}
              </option>
            ))}
          </select>
        </div>

       
        <div>
          <label className="block mb-1 font-medium">Departure Airport</label>
          <select
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Departure Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.airport_name} - {airport.city}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block mb-1 font-medium">Total Seats</label>
          <input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            required
            min={1}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Available Seats</label>
          <input
            type="number"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            required
            min={0}
            max={totalSeats || undefined}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price per Seat</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Flight
        </button>
      </form>
    </div>
  );
}
