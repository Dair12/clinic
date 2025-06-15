import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function GET(req: NextRequest){
    try{
        const specialties = await db.specialty.findMany();
        return NextResponse.json(specialties, { status: 201 });
    }catch(error) {
        console.error("Ошибка при поиске:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}