/** @format */

// app/login/layout.tsx
"use client";

import React from "react";

// Un layout vacío, que anula el layout de `app/layout.tsx`
export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
