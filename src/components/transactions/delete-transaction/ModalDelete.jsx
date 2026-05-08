import { useContextProvider } from "../../../context/context";
import { useMutation } from "@tanstack/react-query";
import { deleteEntry, queryClient } from "../../../utils/http";
import toast from "react-hot-toast";

function ModalDelete() {
	const { dispatch, selectedTransaction } = useContextProvider();
	const { mutate } = useMutation({
		mutationFn: (data) => deleteEntry(data),
		onMutate: async (body) => {
			await queryClient.cancelQueries({ queryKey: ["entries"] });
			const previousCache = queryClient.getQueryData(["entries"]);
			queryClient.setQueryData(["entries"], (oldData) => {
				if (!oldData) return oldData;

				return oldData.filter((e) => e.id !== body.id);
			});

			return { previousCache };
		},
		onError: (err, data, context) => {
			queryClient.setQueryData(["entries"], context.previousCache);
			toast.error(err.message);
		},
		onSuccess: () => {
			toast.success("Transação deletada!");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["entries"] });

			dispatch({ type: "selectTransaction", payload: { transaction: null, type: null } });
		},
	});

	async function handleDelete() {
		mutate(selectedTransaction);
	}

	return (
		<div className="delete-modal-overlay">
			<div className="delete-transaction-modal">
				<header className="modal-header">
					<h2>Excluir Transação</h2>
					<button onClick={() => dispatch({ type: "selectTransaction", payload: { transaction: null, type: null } })} className="btn-close" aria-label="Fechar modal">
						&times;
					</button>
				</header>

				<div className="modal-body">
					<p>Tem certeza que deseja excluir esta transação? Esta ação não poderá ser desfeita e o valor será removido do seu saldo.</p>
				</div>

				<footer className="modal-footer">
					<button onClick={() => dispatch({ type: "selectTransaction", payload: { transaction: null, type: null } })} className="btn-cancel">
						Cancelar
					</button>
					<button onClick={handleDelete} className="btn-confirm-delete">
						Quero deletar essa transação
					</button>
				</footer>
			</div>
		</div>
	);
}

export default ModalDelete;
