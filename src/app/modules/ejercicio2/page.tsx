/** @format */
"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ProductsTable } from "./components/products-table";

const productos = [
	{ product: "Manzana", price: 1.5 },
	{ product: "Pan", price: 0.8 },
	{ product: "Leche", price: 0.95 },
	{ product: "Carne", price: 5.0 },
	{ product: "Pescado", price: 7.0 },
	{ product: "Verduras", price: 2.5 },
	{ product: "Frutas", price: 3.0 },
	{ product: "Cereal", price: 4.0 },
	{ product: "Galletas", price: 2.0 },
	{ product: "Refresco", price: 1.2 },
];

const Ejercicio2Page = () => {
	return (
		<>
			<h2 className="text-2xl font-bold underline pt-1 ">Ejercicio 1.2</h2>
			<p className="text-xl pt-4">
				Crear una funcion que dado un objeto de productos llene una tabla y sume
				el total
			</p>
			<SyntaxHighlighter
				className="mt-4"
				language={"javascript"}
				style={oneDark}
				showLineNumbers
			>
				{`
				"use client";

				import {
					Table,
					TableHeader,
					TableRow,
					TableHead,
					TableBody,
					TableCell,
				} from "@/components/ui/table";

				interface Product {
					product: string;
					price: number;
				}

				interface ProductsTableProps {
					products: Product[];
				}

				export function ProductsTable({ products }: ProductsTableProps) {
					// Calculamos el total al vuelo
					const total = products.reduce((sum, item) => sum + item.price, 0);

					return (
						<div className="space-y-4">
							{/* Tabla con chadcn/ui */}
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Producto</TableHead>
										<TableHead className="text-right">Precio (USD)</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{products.map((item) => (
										<TableRow key={item.product}>
											<TableCell>{item.product}</TableCell>
											<TableCell className="text-right">
												item.price.toFixed(2)
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{/* Total */}
							<p className="text-right font-semibold">
								Total: total.toFixed(2)
							</p>
						</div>
					);
				}
				`}
			</SyntaxHighlighter>

			<h1 className="text-2xl font-bold mb-4 pt-4">
				Ejemplo de implementación con NextJS y chadcn
			</h1>
			<ProductsTable products={productos} />
		</>
	);
};

export default Ejercicio2Page;
