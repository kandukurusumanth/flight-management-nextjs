import { NewBookingService } from "@/app/lib/services/booking";
import { NextResponse } from "next/server";

export async function POST(req,res) {
    try {
        const body = await req.json()
        const data = await NewBookingService(body)
        return NextResponse.json({data:data})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
