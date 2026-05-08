import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { editEntry, getEntries, queryClient } from "../../../utils/http";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useContextProvider } from "../../../context/context.js";

function ModalForm() {
	const { dispatch, selectedTransaction } = useContextProvider();

	const [isNewCategory, setIsNewCategory] = useState(false);

	const [isDifferent, setIsDifferent] = useState(false);

	const [transaction, setTransaction] = useState({ ...selectedTransaction });

	const date = new Date(transaction.date).toISOString().split("T")[0];

	const MAX_CHARS = 70;
	const formRef = useRef(null);

	const { data, isPending } = useQuery({
		queryKey: ["entries"],
		queryFn: getEntries,
	});

	const { mutate } = useMutation({
		mutationFn: (data) => editEntry(data),
		onMutate: async (body) => {
			await queryClient.cancelQueries({ queryKey: ["entries"] });
			const previousCache = queryClient.getQueryData(["entries"]);
			queryClient.setQueryData(["entries"], (oldData) => {
				if (!oldData) return oldData;

				const index = oldData.findIndex((e) => e.id === body.id);
				oldData[index] = body;

				return [...oldData];
			});

			return { previousCache };
		},
		onError: (err, data, context) => {
			queryClient.setQueryData(["entries"], context.previousCache);

			toast.error(err.message);
		},
		onSuccess: () => {
			toast.success("Transação editada!");
			setIsDifferent(false);
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

		mutate({ id: selectedTransaction.id, ...body });
	}

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		setTransaction((prev) => {
			const transactionKeys = Object.keys(selectedTransaction);
			const updatedTransaction = { ...prev, [name]: value };
			if (
				transactionKeys.some((key) => {
					if (key === "date") {
						const date1 = new Date(updatedTransaction[key].includes("T") ? updatedTransaction[key] : updatedTransaction[key] + "T04:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
						const date2 = new Date(selectedTransaction[key].includes("T") ? selectedTransaction[key] : selectedTransaction[key] + "T04:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

						if (date1 !== date2) {
							return true;
						} else {
							return false;
						}
					}
					if (updatedTransaction[key] != selectedTransaction[key]) {
						return true;
					} else {
						return false;
					}
				})
			) {
				setIsDifferent(true);
			} else {
				setIsDifferent(false);
			}
			return updatedTransaction;
		});
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="modal-form">
			{/* 1. Valor */}
			<div className="form-group">
				<label htmlFor="amount">Valor (R$)</label>

				<input type="number" min="0.01" step="0.01" id="value" name="value" value={transaction.value} placeholder="0,00" required onChange={handleChange} />
			</div>

			{/* 2. Tipo (Custom Radio estilo Segmented Control) */}
			<div className="form-group">
				<label>Tipo de Transação</label>
				<div className="segmented-control">
					<label className={`segment ${transaction.type === "out" ? "active-out" : ""}`}>
						<input type="radio" name="type" value="out" checked={transaction.type === "out"} onChange={handleChange} />
						Despesa
					</label>
					<label className={`segment ${transaction.type === "in" ? "active-in" : ""}`}>
						<input type="radio" name="type" value="in" checked={transaction.type === "in"} onChange={handleChange} />
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
					<select value={transaction.category} id="category" name="category" onChange={handleChange}>
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

				<input onChange={handleChange} value={date} max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`} type="date" id="date" name="date" required />
			</div>

			{/* 5. Descrição (Textarea com contador) */}
			<div className="form-group">
				<label htmlFor="description">Descrição</label>
				<div className="textarea-wrapper">
					<textarea required id="description" name="description" rows="3" placeholder="Detalhes sobre a transação..." maxLength={MAX_CHARS} value={transaction.description} onChange={handleChange}></textarea>
					<span className={`char-count ${transaction.description.length >= MAX_CHARS ? "limit-reached" : ""}`}>
						{transaction.description.length} / {MAX_CHARS}
					</span>
				</div>
			</div>

			{/* Ações */}
			<footer className="modal-actions">
				<button onClick={() => dispatch({ type: "selectTransaction", payload: { transaction: null, type: null } })} type="button" className="btn-cancel">
					Cancelar
				</button>
				{isDifferent && (
					<button type="submit" className="btn-submit">
						Salvar alterações
					</button>
				)}
			</footer>
		</form>
	);
}

export default ModalForm;
