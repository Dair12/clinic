import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, specialtyId } = data;

    if (!name || !specialtyId) {
      return NextResponse.json({ error: "Имя и ID специальности обязательны" },{ status: 400 });
    }

    await db.specialist.create({data: {name,specialtyId,},});

    return NextResponse.json({message: "Специальность создана"}, { status: 201 });
  } catch (error) {
    console.error("Ошибка при добавлении специалиста:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}