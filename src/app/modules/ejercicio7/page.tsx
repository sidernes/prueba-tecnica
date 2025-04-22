/** @format */
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Ejercicio7Page = () => {
	return (
		<>
			<h2 className="text-2xl font-bold underline pt-1 ">Ejercicio 3.1</h2>
			<p className="text-xl pt-4">
				Crear una base de datos para gestionar proyectos y actividades
			</p>
			<SyntaxHighlighter
				className="mt-4"
				language={"sql"}
				style={oneDark}
				showLineNumbers
			>
				{`
					USE BASE_DE_DATOS; 
					GO

					-- =================================================
					-- 1) Tabla Proyectos
					-- =================================================
					CREATE TABLE dbo.Proyectos (
							ProyectoID      INT           IDENTITY(1,1) NOT NULL PRIMARY KEY,
							Nombre          NVARCHAR(255) NOT NULL,
							FechaInicio     DATETIME2     NOT NULL,
							Ubicacion       NVARCHAR(MAX) NULL,            
							MesesEstimados  INT           NOT NULL
					);
					GO

					-- =================================================
					-- 2) Tabla Actividades
					-- =================================================
					CREATE TABLE dbo.Actividades (
							ActividadID       INT           IDENTITY(1,1) NOT NULL PRIMARY KEY,
							ProyectoID        INT           NOT NULL,      -- FK a Proyectos
							Nombre            NVARCHAR(255) NOT NULL,
							FechaInicio       DATETIME2     NOT NULL,
							FechaFinEstimada  DATETIME2     NULL,
							Descripcion       NVARCHAR(MAX) NULL,
							CONSTRAINT FK_Actividades_Proyectos
								FOREIGN KEY (ProyectoID)
								REFERENCES dbo.Proyectos(ProyectoID)
								ON DELETE CASCADE    -- Al borrar un proyecto, se eliminan sus actividades
					);
					GO

					-- Índice para acelerar búsquedas por proyecto
					CREATE INDEX IX_Actividades_ProyectoID
						ON dbo.Actividades(ProyectoID);
					GO
					`}
			</SyntaxHighlighter>
		</>
	);
};

export default Ejercicio7Page;
