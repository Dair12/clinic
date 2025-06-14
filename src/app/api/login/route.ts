import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import {db} from "@/lib/db";

export async function POST(req: NextRequest) {
    try{
        const dataFromUser = await req.json();
        const {email, password} = dataFromUser;

        if(!email || !password){
            return NextResponse.json({error: "Все поля обязательны для заполнения"}, {status: 400});
        }
        const data = await db.user.findUnique({where: {email}});
        if(!data){
            return NextResponse.json({error: "Пользователь не найден"}, {status: 404});
        }
        const isPasswordValid = await compare(password, data.password);
        if(isPasswordValid === false){
            return NextResponse.json({error: "Неверный пароль"}, {status: 401});
        }
        return NextResponse.json({message: "Успешный вход"}, {status: 200});
    }catch(error) {
        console.error("Ошибка при входе:", error);
        return NextResponse.json({error: "Ошибка сервера"}, {status: 500});
    }
}