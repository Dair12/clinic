import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: NextRequest){
    try {
        const data = await req.json();
        const {name, email, password, role} = data;
        if(!name || !email || !password) {
            return NextResponse.json({error: "Все поля обязательны для заполнения"}, {status: 400});
        }
            
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
        return NextResponse.json({ error: "Пользователь уже существует" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role || "USER",
        },
        });

        return NextResponse.json({ message: "Пользователь создан" }, { status: 201 });
    }catch(error) {
        console.error("Ошибка при регистрации:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}