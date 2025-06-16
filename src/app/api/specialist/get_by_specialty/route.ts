import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function GET(req: NextRequest){
    try{
        const { searchParams } = new URL(req.url)
        const specialtyId = searchParams.get("specialtyId");
        if (!specialtyId) {
            return NextResponse.json({ error: "specialtyId обязателен" }, { status: 400 });
        }
        const specialties = await db.specialist.findMany({where:{specialtyId:specialtyId}});
        return NextResponse.json(specialties, { status: 200 });
    }catch(error) {
        console.error("Ошибка при поиске:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}