/** @format */

"use client";

import * as React from "react";
import {
	CodeXml,
	CopyPlus,
	Database,
	FileKey,
	Loader,
	RefreshCw,
	Users,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from "@/components/ui/sidebar";
const data = {
	user: {
		name: "Ricardo Villalta",
		email: "m@example.com",
		avatar: "/images/avatar-masculino.png",
	},
	navMain: [
		{
			title: "Ejercicio 1.1",
			url: "/modules/ejercicio1",
			icon: CodeXml,
			isActive: true,
		},
		{
			title: "Ejercicio 1.2",
			url: "/modules/ejercicio2",
			icon: CodeXml,
			isActive: true,
		},
		{
			title: "Ejercicio 2.1",
			url: "/modules/ejercicio3",
			icon: CopyPlus,
			isActive: true,
		},
		{
			title: "Ejercicio 2.2",
			url: "/modules/ejercicio4",
			icon: FileKey,
			isActive: true,
		},
		{
			title: "Ejercicio 2.3",
			url: "/modules/ejercicio5",
			icon: RefreshCw,
			isActive: true,
		},
		{
			title: "Ejercicio 2.4",
			url: "/modules/ejercicio6",
			icon: Loader,
			isActive: true,
		},
		{
			title: "Ejercicio 3.1",
			url: "/modules/ejercicio7",
			icon: Database,
			isActive: true,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
