import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function POST(req: NextRequest){
    try{
        const data = await req.json();
        const {name} = data;

        if(!name) {
            return NextResponse.json({error: "Все поля обязательны для заполнения"}, {status: 400});
        }
            
        const existingUser = await db.specialty.findUnique({ where: { name } });
        if (existingUser) {
        return NextResponse.json({ error: "Специальность уже существует" }, { status: 409 });
        }
        await db.specialty.create({
        data: {
            name
        },
        });
        return NextResponse.json({ message: "Специальность создана" }, { status: 201 });
    }catch(error) {
        console.error("Ошибка при создании:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}