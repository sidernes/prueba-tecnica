/** @format */

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			size="icon"
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className={`relative ${
				resolvedTheme === "light"
					? "bg-gray-900 hover:bg-gray-700"
					: "bg-yellow-100 hover:bg-yellow-200"
			}`}
		>
			{resolvedTheme === "light" ? (
				<Moon className="h-[2rem] w-[2rem] text-gray-100" />
			) : (
				<Sun className="h-[2rem] w-[2rem] text-orange-800" />
			)}
		</Button>
	);
}
