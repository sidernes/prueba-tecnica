/** @format */

// src/components/custom/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
	const [email, setEmail] = useState("alice@example.com");
	const [password, setPassword] = useState("password123");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (res.ok) {
			// Login exitoso
			// router.push("/modules/ejercicio1");
			router.push("/modules");
			return;
		}

		// 💥 Intentamos parsear JSON, pero lo protegemos
		let errorMsg = "Error desconocido";
		try {
			const body = await res.json();
			if (body?.error) errorMsg = body.error;
		} catch (jsonErr) {
			// Si no es JSON, lo leemos como texto
			try {
				const text = await res.text();
				if (text) errorMsg = text;
			} catch {
				/* no-op */
			}
		}

		setError(errorMsg);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto p-6 border rounded space-y-4"
		>
			{error && <p className="text-red-500">{error}</p>}
			<div>
				<h1 className="text-3xl mb-6">Acceso a prueba tecnica</h1>
				<Label htmlFor="email">Correo electrónico</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<Label htmlFor="password">Contraseña</Label>
				<Input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<Button type="submit">Ingresar</Button>
		</form>
	);
}
