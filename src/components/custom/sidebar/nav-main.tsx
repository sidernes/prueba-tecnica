/** @format */

"use client";

import { MoreHorizontal, type LucideIcon, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		isMain?: boolean; // Nueva propiedad para distinguir menús principales
		items?: {
			id?: number;
			title: string;
			url?: string;
			options?: {
				title: string;
				url: string;
				icon?: LucideIcon;
			}[];
		}[];
	}[];
}) {
	const [activeItem, setActiveItem] = useState<string | null>(null);
	const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

	const menuRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const handleSelect = (url: string, title: string, isSubItem = false) => {
		if (isSubItem) {
			setActiveSubItem(title);
		} else {
			setActiveItem(title);
			setActiveSubItem(null); // Desmarca subitems al seleccionar un menú principal
		}
		router.push(url);
	};

	// Filtrado de secciones con subitems coincidentes
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				activeItem // Solo afecta menús principales
			) {
				setActiveItem(null); // Desmarca solo el menú principal
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [activeItem]);

	return (
		<div ref={menuRef}>
			<SidebarGroup>
				<SidebarMenu>
					{items.length > 0 ? (
						items.map((section) => (
							<Collapsible key={section.title} defaultOpen={section.isActive}>
								<CollapsibleTrigger asChild>
									<SidebarMenuItem>
										<SidebarMenuButton
											onClick={() =>
												handleSelect(section.url, section.title, false)
											}
											tooltip={section.title}
											className={`w-full ${
												activeItem === section.title
													? "bg-gray-200 dark:bg-gray-700"
													: ""
											}`}
										>
											{section.icon && <section.icon />}
											<span>{section.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</CollapsibleTrigger>

								<CollapsibleContent>
									<SidebarMenuSub>
										{section.items?.map((subItem) => (
											<SidebarMenuSubItem key={subItem.title}>
												<SidebarMenuSubButton asChild>
													<a
														href={subItem.url}
														onClick={() =>
															handleSelect(subItem.url!, subItem.title, true)
														}
														className={`w-full flex items-center justify-between ${
															activeSubItem === subItem.title
																? "text-blue-500 font-semibold bg-slate-300 dark:bg-slate-700"
																: ""
														}`}
													>
														<span>{subItem.title}</span>

														{Array.isArray(subItem.options) &&
															subItem.options.length > 0 && (
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<MoreHorizontal className="ml-2 cursor-pointer" />
																	</DropdownMenuTrigger>
																	<DropdownMenuContent
																		className="w-48 rounded-lg"
																		align="start"
																	>
																		{subItem.options.map((option) => (
																			<DropdownMenuItem
																				key={option.title}
																				onClick={() =>
																					handleSelect(
																						option.url,
																						option.title,
																						true
																					)
																				}
																			>
																				{option.icon && (
																					<option.icon className="mr-2 text-muted-foreground" />
																				)}
																				<span>{option.title}</span>
																			</DropdownMenuItem>
																		))}
																		<DropdownMenuSeparator />
																		<DropdownMenuItem>
																			<Trash2 className="mr-2 text-muted-foreground" />
																			<span>Eliminar</span>
																		</DropdownMenuItem>
																	</DropdownMenuContent>
																</DropdownMenu>
															)}
													</a>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</Collapsible>
						))
					) : (
						<p className="text-center text-muted-foreground py-4">
							No se encontraron resultados
						</p>
					)}
				</SidebarMenu>
			</SidebarGroup>
		</div>
	);
}
