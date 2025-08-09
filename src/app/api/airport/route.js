import { NextResponse } from "next/server";
import { GetAllAirportService,CreateNewAirportService } from "@/app/lib/services/airport";
export async function GET() {
    const data = await GetAllAirportService();
    console.log(data,"this is the data from the get")
    return NextResponse.json({data:data},{status:200})
}

export async function POST(req,res) {
    const body = await req.json()
    const Aiport = await CreateNewAirportService(body)
    return NextResponse.json({data:Aiport},{status:201})
}