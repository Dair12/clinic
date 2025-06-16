import { NextRequest, NextResponse } from "next/server";
import {getUserRole} from "@/lib/getUserRole";

export async function GET(req: NextRequest){
    try{
        const role = await getUserRole();
        return NextResponse.json({"role":role}, { status: 200 });
    }catch(error) {
        console.error("Ошибка при поиске:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}