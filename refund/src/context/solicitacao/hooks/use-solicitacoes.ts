import { useQuery } from "@tanstack/react-query";
import type { Solicitacao } from "../models/solicitacao";
import { fetcher } from "@/helpers/api";
import { useState } from "react";

export default function useSolicitacoes() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const query = new URLSearchParams({
    q: q ?? "",
    page: page.toString(),
  });
  const { data, isLoading } = useQuery<Solicitacao>({
    queryKey: ["refunds", page, q],
    queryFn: () => fetcher(`/refunds?${query.toString()}`),
  });
  return {
    data,
    isLoading,
    setPage,
    setQ,
  };
}
