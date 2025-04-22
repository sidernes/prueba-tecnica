/** @format */
"use client";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	// SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function SelectorPanel() {
	const [selectedValue, setSelectedValue] = useState("general"); // Valor por defecto

	const handleChange = (value: string) => {
		setSelectedValue(value);
	};
	return (
		<Select value={selectedValue} onValueChange={handleChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Modo consulta" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{/* <SelectLabel>Fruits</SelectLabel> */}
					<SelectItem value="general">General</SelectItem>
					<SelectItem value="conteo-pasajeros">Conteo pasajeros</SelectItem>
					<SelectItem value="control-tiempo">Control de tiempo</SelectItem>
					<SelectItem value="auditor-recorrido">Auditor recorridos</SelectItem>
					<SelectItem value="auditor-molinete">Auditor molinete</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
