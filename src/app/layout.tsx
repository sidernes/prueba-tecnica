/** @format */

// /** @format */

// // app/layout.tsx
// import "./globals.css";
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { ThemeProvider } from "@/components/theme-provider";

// import { Layout } from "@/components/main-layout"; // <— importa tu Layout nuevo

// const geistSans = localFont({
// 	src: "./fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });
// const geistMono = localFont({
// 	src: "./fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

// export const metadata: Metadata = {
// 	title: "Prueba técnica",
// 	description: "Resolución por parte de Ricardo Villalta",
// };

// export default function RootLayout({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<html lang="es" className="dark">
// 			<body
// 				suppressHydrationWarning
// 				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// 			>
// 				<ThemeProvider
// 					attribute="class"
// 					defaultTheme="system"
// 					enableSystem
// 					disableTransitionOnChange
// 				>
// 					{/* Aquí envolvemos todas las páginas en tu Layout */}
// 					<Layout>{children}</Layout>
// 				</ThemeProvider>
// 			</body>
// 		</html>
// 	);
// }

// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es" className="dark">
			<body suppressHydrationWarning className="antialiased">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
