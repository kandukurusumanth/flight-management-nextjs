import { GetUserByIdService } from "@/app/lib/services/userservice"
import { NextResponse } from "next/server"

export async function GET(req,{ params }) {
    const user_id = parseInt(params.id)

    console.log(user_id,"this is the user_id")
    const user_data = await GetUserByIdService(user_id)
    return NextResponse.json({data:user_data},{status:200})

}