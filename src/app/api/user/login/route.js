import { loginService } from "@/app/lib/services/userservice";
import { NextResponse } from "next/server";

export async function POST(req,res) {
    try {
        const body = await req.json()  
        const isLogin = await loginService(body)
        return  NextResponse.json({data:isLogin},{status:201})
    } catch (error) {
        const errormessage = error.message || error
        return NextResponse.json({error:errormessage},{status:error.statusCode || 500})
    }
}