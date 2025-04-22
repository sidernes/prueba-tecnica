/** @format */

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image"; // Importa el componente Image de Next.js
import Scene02 from "@/images/Scenes08.svg"; // Ruta del SVG

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold">Tkontrol</h1>
								<p className="text-balance text-muted-foreground">
									Ingrese sus credenciales para continuar
								</p>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="text">Usuario</Label>
								<Input
									id="user"
									type="text"
									placeholder="mi@usuario"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Contraseña</Label>
								</div>
								<Input id="password" type="password" required />
							</div>
							<Button type="submit" className="w-full">
								Acceder
							</Button>
						</div>
					</form>
					<div className="relative hidden bg-muted md:block">
						<Image
							src={Scene02}
							alt="Image"
							layout="fill" // Esto hace que ocupe toda la posición relativa del contenedor
							objectFit="cover" // Ajusta la imagen para cubrir todo el espacio
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
