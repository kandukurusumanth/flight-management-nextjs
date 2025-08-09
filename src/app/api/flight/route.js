// app/api/flight/route.js

import { Admincheck } from "@/app/lib/middleware/checkadminmiddleware";
import { CreateNewFlightServices, GetAllFligtServices } from "@/app/lib/services/flight";
import { NextResponse } from "next/server";

export async function GET(request) {
   const { searchParams } = new URL(request.url);
  
   
  const flights = await GetAllFligtServices(searchParams);
  return NextResponse.json({data:flights},{status:200});
}

export async function flightController(req,res) {
  try {
      const body = await req.json()
    const flights = await CreateNewFlightServices(body)
    return NextResponse.json({data:flights},{status:201})
  } catch (error) {
    return NextResponse.json({error:error.message},{status:500})
  }
  
}
export const POST = Admincheck(flightController)
