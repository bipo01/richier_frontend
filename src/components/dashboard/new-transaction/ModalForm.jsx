import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getEntries, newEntry, queryClient } from "../../../utils/http";
import { useRef } from "react";
import toast from "react-hot-toast";

function ModalForm({ onClose }) {
	const [type, setType] = useState("out");
	const [isNewCategory, setIsNewCategory] = useState(false);
	const [description, setDescription] = useState("");

	const MAX_CHARS = 70;
	const formRef = useRef(null);

	const { data, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	const { mutate } = useMutation({
		mutationFn: (data) => newEntry(data),
		onMutate: async (body) => {
			await queryClient.cancelQueries({ queryKey: ["entries"] });
			const previousCache = queryClient.getQueryData(["entries"]);
			queryClient.setQueryData(["entries"], (oldData) => {
				if (!oldData) return oldData;

				return [...oldData, { id: crypto.randomUUID(), ...body }];
			});

			return { previousCache };
		},
		onError: (err, data, context) => {
			queryClient.setQueryData(["entries"], context.previousCache);

			toast.error(err.message);
		},
		onSuccess: () => {
			toast.success("Nova transação adicionada!");
			formRef.current.reset();
			setDescription("");
			setType("out");
			setIsNewCategory(false);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["entries"] });
		},
	});

	if (isPending) return;

	const categories = [...new Set(data.map((e) => e.category))];

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const body = Object.fromEntries(formData.entries());

		mutate(body);
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="modal-form">
			{/* 1. Valor */}
			<div className="form-group">
				<label htmlFor="amount">Valor (R$)</label>

				<input type="number" min="0.01" step="0.01" id="value" name="value" placeholder="0,00" required />
			</div>

			{/* 2. Tipo (Custom Radio estilo Segmented Control) */}
			<div className="form-group">
				<label>Tipo de Transação</label>
				<div className="segmented-control">
					<label className={`segment ${type === "out" ? "active-out" : ""}`}>
						<input type="radio" name="type" value="out" checked={type === "out"} onChange={() => setType("out")} />
						Despesa
					</label>
					<label className={`segment ${type === "in" ? "active-in" : ""}`}>
						<input type="radio" name="type" value="in" checked={type === "in"} onChange={() => setType("in")} />
						Receita
					</label>
				</div>
			</div>

			{/* 3. Categoria (Select ou Input com Toggle) */}
			<div className="form-group">
				<div className="category-header">
					<label htmlFor="category">Categoria</label>
					<label className="checkbox-toggle">
						<input type="checkbox" checked={isNewCategory} onChange={(e) => setIsNewCategory(e.target.checked)} />
						Criar nova categoria
					</label>
				</div>

				{isNewCategory ? (
					<input type="text" id="category" name="category" placeholder="Digite a nova categoria..." required autoFocus />
				) : (
					<select id="category" name="category">
						<option value="">Sem categoria</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				)}
			</div>

			{/* 4. Data */}
			<div className="form-group">
				<label htmlFor="date">Data da Transação</label>

				<input max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`} type="date" id="date" name="date" required />
			</div>

			{/* 5. Descrição (Textarea com contador) */}
			<div className="form-group">
				<label htmlFor="description">Descrição</label>
				<div className="textarea-wrapper">
					<textarea required id="description" name="description" rows="3" placeholder="Detalhes sobre a transação..." maxLength={MAX_CHARS} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
					<span className={`char-count ${description.length >= MAX_CHARS ? "limit-reached" : ""}`}>
						{description.length} / {MAX_CHARS}
					</span>
				</div>
			</div>

			{/* Ações */}
			<footer className="modal-actions">
				<button onClick={onClose} type="button" className="btn-cancel">
					Cancelar
				</button>
				<button type="submit" className="btn-submit">
					Adicionar
				</button>
			</footer>
		</form>
	);
}

export default ModalForm;
