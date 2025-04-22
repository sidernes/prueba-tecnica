/** @format */

"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importar localización en español
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
	// Estado inicial con la fecha actual
	const [date, setDate] = React.useState<Date>(new Date());

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{/* Mostrar fecha en español */}
					{date ? (
						format(date, "PPP", { locale: es })
					) : (
						<span>Selecciona una fecha</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(newDate) => {
						if (newDate) {
							setDate(newDate); // Actualiza la fecha seleccionada
						}
					}}
					locale={es}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
