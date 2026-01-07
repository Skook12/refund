import { useQuery } from "@tanstack/react-query";
import type { ComprovanteDownload } from "../models/comprovante";
import { fetcher } from "@/helpers/api";

export default function useComprovante(id: string | undefined) {
  const { data, isLoading } = useQuery<ComprovanteDownload>({
    queryKey: ["receipts", id],
    queryFn: () => fetcher(`receipts/download/${id}`),
    enabled: !!id,
  });
  return { url: data, isDownloading: isLoading };
}
