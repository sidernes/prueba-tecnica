/** @format */
"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

//objeto persona
const persona = {
	name: "Jhon Doe",
	email: "email@gmail.com",
	age: 30,
};
const Ejercicio1Page = () => {
	return (
		<>
			<h2 className="text-2xl font-bold underline pt-1 ">Ejercicio 1.1</h2>
			<p className="text-xl pt-4">
				Crear una funcion que dado un objeto con los parametros name, email y
				age, <br />
				valide que el nombre no este vacio, el correo sea valido y la edad sea
				mayor a 18
			</p>
			<SyntaxHighlighter
				className="mt-4"
				language={"javascript"}
				style={oneDark}
				showLineNumbers
			>
				{`
				const persona = {
					name: "Jhon Doe",
					email: "email@gmail.com",
					age: 30,
				};
				
				const validarPersona = (persona) => {
					if (!persona.name) {
						console.log("El nombre no puede estar vacio");
						return false;
					}
					const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					if (!regex.test(persona.email)) {
						console.log("El correo no es valido");
						return false;
					}
					if (persona.age < 18) {
						console.log("La edad debe ser mayor a 18");
						return false;
					}
					return true;
				};
				`}
			</SyntaxHighlighter>
		</>
	);
};

export default Ejercicio1Page;
