/** @format */

// components/Layout.tsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/sidebar/app-sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="px-4">
				{" "}
				{/* o el padding que necesites para dejar espacio al sidebar */}
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
