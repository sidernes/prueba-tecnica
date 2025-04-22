/** @format */

// app/api/auth/seed/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function doSeed() {
	const seedUsers = [
		{ email: "alice@example.com", password: "password123", name: "Alice" },
		{ email: "bob@example.com", password: "secret456", name: "Bob" },
		{ email: "carol@example.com", password: "1234abcd", name: "Carol" },
	];

	for (const u of seedUsers) {
		const hashed = await bcrypt.hash(u.password, 10);
		await prisma.user.upsert({
			where: { email: u.email },
			update: { name: u.name, password: hashed },
			create: { email: u.email, name: u.name, password: hashed },
		});
	}
}

export async function POST() {
	// if (process.env.NODE_ENV !== "development") {
	// 	return NextResponse.json(
	// 		{ error: "Prohibido en producción" },
	// 		{ status: 403 }
	// 	);
	// }
	try {
		await doSeed();
		return NextResponse.json({ message: "Seed completado" });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Error al hacer seed" }, { status: 500 });
	}
}

// Esto te permite pegar en el navegador y disparar el mismo código con GET
export async function GET() {
	return POST();
}
