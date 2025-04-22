/** @format */

// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
	// Aseguramos el tipo en el scope global
	var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalThis.prisma = prisma;
}
