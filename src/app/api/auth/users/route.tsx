/** @format */

import { prisma } from "@/lib/prisma";

export async function GET() {
	const users = await prisma.user.findMany();
	return new Response(JSON.stringify(users), {
		headers: { "Content-Type": "application/json" },
	});
}
