/** @format */

// components/ProductsTable.tsx
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
								${item.price.toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Total */}
			<p className="text-right font-semibold pb-8">
				Total: ${total.toFixed(2)}
			</p>
		</div>
	);
}
