/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects
export async function GET() {
	try {
		const proyectos = await prisma.project.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(proyectos);
	} catch (error) {
		console.error("Error en GET /api/projects:", error);
		return NextResponse.json(
			{ message: "Error interno al obtener proyectos" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	const { name, startDate, location, estimatedMonths } = await request.json();
	const proyecto = await prisma.project.create({
		data: {
			name,
			startDate: new Date(startDate),
			location, // espera un JSON o null
			estimatedMonths: Number(estimatedMonths),
		},
	});
	return NextResponse.json(proyecto);
}
