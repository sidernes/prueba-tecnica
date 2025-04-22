/** @format */

import { NextResponse } from "next/server";

export async function POST() {
	const res = NextResponse.json({ message: "Sesión cerrada" });
	res.cookies.set("token", "", { path: "/", maxAge: 0 });
	return res;
}
