/** @format */
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Ejercicio5Page = () => {
	return (
		<>
			<h2 className="text-2xl font-bold underline pt-1 ">Ejercicio 2.3</h2>
			<p className="text-xl pt-4">
				Formulario reutilizable para crear y editar proyectos, ejemplo de uso
			</p>
			<SyntaxHighlighter
				className="mt-4"
				language={"javascript"}
				style={oneDark}
				showLineNumbers
			>
				{`
					import { ProjectForm, ProjectFormData } from "@/components/ProjectForm";

					const [formData, setFormData] = useState<ProjectFormData>({
						name: "",
						startDate: "",
						location: "",
						estimatedMonths: 1,
					});
					const [editingId, setEditingId] = useState<string | null>(null);

					<ProjectForm
						formData={formData}
						editingId={editingId}
						onChange={setFormData}
						onSubmit={editingId ? handleUpdate : handleCreate}
						onCancel={() => {
							setEditingId(null);
							setFormData({ name: "", startDate: "", location: "", estimatedMonths: 1 });
						}}
					/>
					`}
			</SyntaxHighlighter>
		</>
	);
};

export default Ejercicio5Page;
