/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const proyecto = await prisma.project.findUnique({
		where: { id: params.id },
	});
	if (!proyecto) return NextResponse.error();
	return NextResponse.json(proyecto);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { name, startDate, location, estimatedMonths } = await request.json();
	const proyecto = await prisma.project.update({
		where: { id: params.id },
		data: {
			name,
			startDate: new Date(startDate),
			location,
			estimatedMonths: Number(estimatedMonths),
		},
	});
	return NextResponse.json(proyecto);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await prisma.project.delete({ where: { id: params.id } });
	return NextResponse.json({ message: "Eliminado" });
}
