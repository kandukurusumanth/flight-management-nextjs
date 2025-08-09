import { CreateNewUserService, GetAllUserService } from "@/app/lib/services/userservice";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await GetAllUserService()
        return NextResponse.json({data:user},{status:200})
    } catch (error) {
        throw error
    }
}
export async function POST(req,res) {
    try {
        const body = await req.json()
        const user = await CreateNewUserService(body)
        return NextResponse.json({data:user},{status:201})
    } catch (error) {
        return NextResponse.json({error:error.message})
    }
}
