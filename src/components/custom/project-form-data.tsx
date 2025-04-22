/** @format */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface ProjectFormData {
	name: string;
	startDate: string;
	location: string;
	estimatedMonths: number;
}

export interface ProjectFormProps {
	formData: ProjectFormData;
	editingId: string | null;
	onChange: (newData: ProjectFormData) => void;
	onSubmit: () => void;
	onCancel?: () => void;
}

export function ProjectForm({
	formData,
	editingId,
	onChange,
	onSubmit,
	onCancel,
}: ProjectFormProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{editingId ? "Editar proyecto" : "Nuevo proyecto"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* Nombre */}
					<div className="flex flex-col space-y-1">
						<Label htmlFor="name">Nombre del proyecto</Label>
						<Input
							id="name"
							placeholder="Ej. Polideportivo Nejapa"
							value={formData.name}
							onChange={(e) => onChange({ ...formData, name: e.target.value })}
						/>
					</div>
					{/* Fecha de inicio */}
					<div className="flex flex-col space-y-1">
						<Label htmlFor="startDate">Fecha de inicio</Label>
						<Input
							id="startDate"
							type="date"
							value={formData.startDate}
							onChange={(e) =>
								onChange({ ...formData, startDate: e.target.value })
							}
						/>
					</div>
					{/* Ubicación */}
					<div className="flex flex-col space-y-1">
						<Label htmlFor="location">Ubicación (JSON)</Label>
						<Input
							id="location"
							placeholder='Ej. {"lat":40.7,"lng":-74.0}'
							value={formData.location}
							onChange={(e) =>
								onChange({ ...formData, location: e.target.value })
							}
						/>
						<p className="text-xs text-muted-foreground">
							Objeto JSON con latitud/longitud para Mapbox.
						</p>
					</div>
					{/* Meses estimados */}
					<div className="flex flex-col space-y-1">
						<Label htmlFor="estimatedMonths">Meses estimados</Label>
						<Input
							id="estimatedMonths"
							type="number"
							min={1}
							value={formData.estimatedMonths}
							onChange={(e) =>
								onChange({
									...formData,
									estimatedMonths: Number(e.target.value) || 1,
								})
							}
						/>
					</div>
				</div>
				<div className="mt-6 flex gap-2">
					<Button type="button" onClick={onSubmit}>
						{editingId ? "Actualizar proyecto" : "Guardar proyecto"}
					</Button>
					{editingId && onCancel && (
						<Button variant="secondary" onClick={onCancel}>
							Cancelar
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
