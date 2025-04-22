/** @format */

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
	const token = req.cookies.get("token")?.value;
	if (!token)
		return NextResponse.json({ error: "No autenticado" }, { status: 401 });

	try {
		const payload = jwt.verify(token, JWT_SECRET) as {
			sub: string;
			email: string;
		};
		const user = await prisma.user.findUnique({
			where: { id: payload.sub },
			select: { id: true, email: true, name: true },
		});
		return NextResponse.json(user);
	} catch {
		return NextResponse.json({ error: "Token inválido" }, { status: 401 });
	}
}
