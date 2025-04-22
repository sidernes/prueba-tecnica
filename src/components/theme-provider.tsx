/** @format */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<NextThemesProvider {...props}>
			{/* Montamos siempre el provider, pero solo renderizamos hijos una vez hidratados */}
			{mounted ? children : null}
		</NextThemesProvider>
	);
}
