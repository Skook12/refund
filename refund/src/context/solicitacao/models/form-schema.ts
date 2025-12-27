import z from "zod";

export const solicitacaoFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é necessária"),
  value: z.string().min(1, "Valor é obrigatório"),
  file: z.custom<FileList>(
    (item) => item instanceof FileList && item.length > 0,
    "Campo Obrigatório"
  ),
});

export type SolicitacaoFormSchema = z.infer<typeof solicitacaoFormSchema>;
