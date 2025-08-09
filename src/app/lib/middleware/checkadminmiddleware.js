const { default: next } = require("next");
const { default: HttpRespone } = require("../utils/custom_error");
const { verifyToken } = require("../utils/jwttoken");


export function Admincheck(handler) {
    return async (req,...args)=>{
        try {
            const authHeader = req.headers.get("authorization");
            if (!authHeader) {
                throw new HttpRespone("No Authorization header found", 401);
            }

            const [, token] = authHeader.split(" ");
            if (!token) {
                throw new HttpRespone("No token found", 401);
            }

            const isValidToken = verifyToken(token); 
            if (!isValidToken) {
                throw new HttpRespone("Invalid token", 401);
            }

            if (isValidToken.role !== "ADMIN") {
                throw new HttpRespone("Not allowed to access this route", 403);
            }

            
            return handler(req, ...args);
        } catch (error) {
            return new Response(
                JSON.stringify({ error: error.message || "Unauthorized" }),
                { status: error.statusCode || 500 }
            );
        }
    }
}