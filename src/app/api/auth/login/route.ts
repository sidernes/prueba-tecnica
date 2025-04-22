/** @format */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
	const { email, password } = await req.json();
	if (!email || !password)
		return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !bcrypt.compareSync(password, user.password))
		return NextResponse.json(
			{ error: "Credenciales inválidas" },
			{ status: 401 }
		);

	// Genera el token
	const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "2h",
	});

	const res = NextResponse.json({ message: "Autenticado" });
	// Guarda en cookie HTTP‑Only
	res.cookies.set("token", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		maxAge: 2 * 60 * 60, // 2 horas
	});
	return res;
}
