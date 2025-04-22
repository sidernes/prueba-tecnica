/** @format */

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Rutas que NO deben protegerse
const PUBLIC_PATHS = [
	"/login",
	"/api/auth/login",
	"/api/auth/logout",
	"/api/auth/seed", // ← añadimos seed aquí
	"/api/auth/users", // ← añadimos seed aquí
];

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Si la ruta es pública, la dejamos pasar
	if (PUBLIC_PATHS.some((p) => pathname === p)) {
		return NextResponse.next();
	}

	// Si no es pública, revisamos token
	const token = req.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.redirect(new URL("/login", req.url));
	}
	try {
		jwt.verify(token, JWT_SECRET);
		return NextResponse.next();
	} catch {
		return NextResponse.redirect(new URL("/login", req.url));
	}
}

// Qué rutas intercepta el middleware
export const config = {
	matcher: [
		// intercepta todo excepto ficheros estáticos
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
