/** @format */

import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const token = req.cookies.get("token")?.value;
	if (!token) {
		return NextResponse.json({ error: "No autenticado" }, { status: 401 });
	}
	// …tu lógica con el token…
	return NextResponse.json({ ok: true });
}
