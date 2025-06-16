import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";
import { getUserId } from '@/lib/getUserId';

export async function POST(req: NextRequest){
    try{
        const data = await req.json();
        const {specialistId,date} = data;
        const userId = await getUserId();

        if(!userId || !specialistId || !date){
            return NextResponse.json({error: "Все поля обязательны для заполнения"}, {status: 400});
        }
            
        const existingUser = await db.user.findUnique({ where: { id:userId } });
        if (!existingUser) {return NextResponse.json({ error: "Пользователя не сушествует" }, { status: 409 });}

        const existingSpecialist = await db.specialist.findUnique({ where: { id:specialistId } });
        if (!existingSpecialist) {return NextResponse.json({ error: "Специалист не сушествует" }, { status: 409 });}

        await db.appointment.create({
        data: {
            userId,
            specialistId,
            date: new Date(date),
        },
        });
        return NextResponse.json({ message: "Забронировано" }, { status: 201 });
    }catch(error) {
        console.error("Ошибка при создании:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}