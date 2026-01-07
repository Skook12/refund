import { useQuery } from "@tanstack/react-query";
import type { SolicitacaoItem } from "../models/solicitacao";
import { fetcher } from "@/helpers/api";

export default function useSolicitacao(id: string | undefined) {
  const { data, isLoading } = useQuery<SolicitacaoItem>({
    queryKey: ["refunds", id],
    queryFn: () => fetcher(`/refunds/${id}`),
    enabled: !!id,
  });

  return { data, isLoading };
}
