import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Solicitacao } from "../models/solicitacao";
import { api, fetcher } from "@/helpers/api";
import { useState } from "react";
import type { SolicitacaoFormSchema } from "../models/form-schema";
import type { Comprovante } from "../models/comprovante";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function useSolicitacoes() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const query = new URLSearchParams({
    q: q ?? "",
    page: page.toString(),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<Solicitacao>({
    queryKey: ["refunds", page, q],
    queryFn: () => fetcher(`/refunds?${query.toString()}`),
  });

  async function createReembolso(payload: SolicitacaoFormSchema) {
    try {
      const { data: comprovante } = await api.post<Comprovante>(
        "receipts",
        {
          receiptFile: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(comprovante.receipt.id);
      await api.post(`/refunds`, {
        title: payload.name,
        category: payload.category,
        value: payload.value,
        receipt: comprovante.receipt.id,
      });

      queryClient.invalidateQueries({ queryKey: ["photos"] });
      toast.success("Reembolso criado com sucesso");
    } catch (error) {
      toast.error("Erro ao criar reembolso");
      throw error;
    }
  }

  async function deleteSolicitacao(id: string) {
    try {
      await api.delete(`/refunds/${id}`);
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      toast.success("Solicitação deletada com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao realizar exclusão da solicitação");
      throw error;
    }
  }

  return {
    data,
    isLoading,
    setPage,
    setQ,
    createReembolso,
    deleteSolicitacao,
  };
}
