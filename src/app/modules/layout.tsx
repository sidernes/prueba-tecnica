/** @format */

// src/app/modules/layout.tsx
"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/sidebar/app-sidebar";

export default function ModulesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="px-4">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
