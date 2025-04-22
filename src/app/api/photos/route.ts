/** @format */

// app/api/photos/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const page = parseInt(url.searchParams.get("page") || "1", 10);
	const limit = parseInt(url.searchParams.get("limit") || "20", 10);

	// Llamas a Picsum con page dinámico
	const res = await fetch(
		`https://picsum.photos/v2/list?page=${page}&limit=${limit}`
	);
	const data = await res.json();

	// Extraes sólo las URLs de descarga
	const urls = (data as any[]).map((img) => img.download_url);
	return NextResponse.json(urls);
}
