/** @format */

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function Ejercicio6Page() {
	const [urls, setUrls] = useState<string[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const LIMIT = 20;

	// Carga una página desde Picsum directamente
	const fetchPage = useCallback(async (pageNum: number) => {
		setLoading(true);
		// FETCH DIRECTO A PICSUM → no pasa por tu servidor
		const res = await fetch(
			`https://picsum.photos/v2/list?page=${pageNum}&limit=${LIMIT}`
		);
		if (!res.ok) {
			setLoading(false);
			return;
		}
		const data: { download_url: string }[] = await res.json();
		if (data.length === 0) {
			setHasMore(false);
		} else {
			// sólo nos importan las URLs
			setUrls((prev) => [...prev, ...data.map((img) => img.download_url)]);
		}
		setLoading(false);
	}, []);

	// Cuando cambie `page`, carga esa página
	useEffect(() => {
		if (hasMore) fetchPage(page);
	}, [page, hasMore, fetchPage]);

	// IntersectionObserver para infinite scroll
	const observerRef = useRef<IntersectionObserver>();
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (loading || !hasMore) return;
		const onIntersect: IntersectionObserverCallback = ([entry]) => {
			if (entry.isIntersecting) setPage((p) => p + 1);
		};
		observerRef.current = new IntersectionObserver(onIntersect, {
			rootMargin: "200px",
		});
		const el = sentinelRef.current;
		if (el) observerRef.current.observe(el);
		return () => {
			if (el && observerRef.current) observerRef.current.unobserve(el);
		};
	}, [loading, hasMore]);

	return (
		<div className="p-6 space-y-6">
			<h2 className="text-2xl font-bold underline pt-1 ">Ejercicio 2.4</h2>
			<p className="text-xl pt-4">
				Realiza multiples peticiones a la API de Picsum para cargar imágenes
				<br />
				usando de forma eficiente las consultas para hacer peticiones parciales
				y evitar cuellos de botella
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
				{urls.map((url, i) => (
					<div key={i} className="relative w-full bg-gray-100">
						<Image
							src={url}
							alt={`Foto ${i + 1}`}
							width={500}
							height={500}
							style={{ objectFit: "cover" }}
							unoptimized // Next no cachea ni procesa
						/>
					</div>
				))}
			</div>

			{/* Sentinela */}
			<div ref={sentinelRef} className="h-8">
				{loading && <p className="text-center">Cargando más…</p>}
				{!hasMore && <p className="text-center">No hay más imágenes</p>}
			</div>
		</div>
	);
}
