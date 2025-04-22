/** @format */

// src/components/custom/calendar/date-picker.tsx
import React from "react";
import { format } from "date-fns/format";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

interface DatePickerProps {
	date: Date | undefined;
	setDate: (date: Date) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
	return (
		<div>
			<DayPicker
				mode="single"
				selected={date}
				onSelect={(newDate: Date | undefined) => {
					if (newDate) {
						setDate(newDate);
					}
				}}
			/>
			<div>
				{date ? (
					format(date, "PPP", { locale: es })
				) : (
					<span>Selecciona una fecha</span>
				)}
			</div>
		</div>
	);
}
