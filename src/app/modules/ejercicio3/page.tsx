/** @format */

// app/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";

interface Project {
	id: string;
	name: string;
	startDate: string;
	location: any;
	estimatedMonths: number;
}

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [form, setForm] = useState({
		name: "",
		startDate: "",
		location: "",
		estimatedMonths: 1,
	});
	const [editingId, setEditingId] = useState<string | null>(null);

	// Carga inicial
	useEffect(() => {
		fetch("/api/projects")
			.then((res) => res.json())
			.then(setProjects);
	}, []);

	// Crear nuevo
	const handleCreate = async () => {
		const payload = {
			...form,
			location: form.location ? JSON.parse(form.location) : null,
		};
		const res = await fetch("/api/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const nuevo = await res.json();
		setProjects([nuevo, ...projects]);
		resetForm();
	};

	// Preparar formulario para editar
	const handleEdit = (p: Project) => {
		setEditingId(p.id);
		setForm({
			name: p.name,
			startDate: p.startDate.slice(0, 10), // yyyy-mm-dd
			location: p.location ? JSON.stringify(p.location) : "",
			estimatedMonths: p.estimatedMonths,
		});
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Actualizar existente
	const handleUpdate = async () => {
		if (!editingId) return;
		const payload = {
			...form,
			location: form.location ? JSON.parse(form.location) : null,
		};
		const res = await fetch(`/api/projects/${editingId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const actualizado = await res.json();
		setProjects(
			projects.map((p) => (p.id === actualizado.id ? actualizado : p))
		);
		resetForm();
		setEditingId(null);
	};

	// Borrar
	const handleDelete = async (id: string) => {
		await fetch(`/api/projects/${id}`, { method: "DELETE" });
		setProjects(projects.filter((p) => p.id !== id));
	};

	const resetForm = () =>
		setForm({ name: "", startDate: "", location: "", estimatedMonths: 1 });

	return (
		<div className="p-6 space-y-8">
			<h2 className="text-2xl font-bold underline pt-1 ">Ejercicio 2.1</h2>
			<p className="text-xl">
				Crear un CRUD y sus respectivos endpoint para crear, editar y eliminar
				registros
			</p>

			{/* === FORMULARIO (crear / editar) === */}
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
								value={form.name}
								onChange={(e) =>
									setForm((f) => ({ ...f, name: e.target.value }))
								}
							/>
						</div>

						{/* Fecha */}
						<div className="flex flex-col space-y-1">
							<Label htmlFor="startDate">Fecha de inicio</Label>
							<Input
								id="startDate"
								type="date"
								value={form.startDate}
								onChange={(e) =>
									setForm((f) => ({ ...f, startDate: e.target.value }))
								}
							/>
						</div>

						{/* Ubicación */}
						<div className="flex flex-col space-y-1">
							<Label htmlFor="location">Ubicación (JSON)</Label>
							<Input
								id="location"
								placeholder='Ej. {"lat":40.7,"lng":-74.0}'
								value={form.location}
								onChange={(e) =>
									setForm((f) => ({ ...f, location: e.target.value }))
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
								value={form.estimatedMonths}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										estimatedMonths: Number(e.target.value) || 1,
									}))
								}
							/>
						</div>
					</div>

					<div className="mt-6 flex gap-2">
						{!editingId ? (
							<Button onClick={handleCreate}>Guardar proyecto</Button>
						) : (
							<>
								<Button onClick={handleUpdate}>Actualizar proyecto</Button>
								<Button
									variant="secondary"
									onClick={() => {
										resetForm();
										setEditingId(null);
									}}
								>
									Cancelar
								</Button>
							</>
						)}
					</div>
				</CardContent>
			</Card>

			{/* === TABLA CON BOTONES DE EDIT y DELETE === */}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Inicio</TableHead>
						<TableHead>Meses</TableHead>
						<TableHead>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{projects.map((p) => (
						<TableRow key={p.id}>
							<TableCell>{p.name}</TableCell>
							<TableCell>
								{new Date(p.startDate).toLocaleDateString()}
							</TableCell>
							<TableCell>{p.estimatedMonths}</TableCell>
							<TableCell className="flex space-x-2">
								<Button size="sm" onClick={() => handleEdit(p)}>
									Editar
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => handleDelete(p.id)}
								>
									Eliminar
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
