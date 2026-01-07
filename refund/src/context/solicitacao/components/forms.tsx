import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputSingleFile from "@/components/input-single-file";
import { Button } from "@/components/ui/button";
import Text from "@/components/text";
import {
  type SolicitacaoFormSchema,
  solicitacaoFormSchema,
} from "../models/form-schema";
import { useState, useEffect } from "react";
import { DialogDeleteConfirmation } from "./confirmation-delete-dialog";
import useSolicitacoes from "../hooks/use-solicitacoes";
import type { SolicitacaoItem } from "../models/solicitacao";
import Icon from "@/components/icon";
import FileImageIcon from "../../../assets/file.svg?react";
import type { ComprovanteDownload } from "../models/comprovante";
interface FormSolicitacaoProps {
  setSucess: (item: boolean) => void;
  defaultData?: SolicitacaoItem;
  fileUrl?: ComprovanteDownload;
}

export default function FormSolicitacao({
  setSucess,
  defaultData,
  fileUrl,
}: FormSolicitacaoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { createReembolso } = useSolicitacoes();
  const form = useForm<SolicitacaoFormSchema>({
    resolver: zodResolver(solicitacaoFormSchema),
    defaultValues: {
      name: defaultData?.refund.title || "",
      category: defaultData?.refund.category || "",
      value: defaultData?.refund.value.toString() || "",
      file: undefined,
    },
  });

  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.refund.title,
        category: defaultData.refund.category,
        value: defaultData.refund.value.toString(),
        file: undefined,
      });
    }
  }, [defaultData, form]);

  async function onSubmit(values: SolicitacaoFormSchema) {
    console.log(values);
    try {
      await createReembolso(values);
      setSucess(true);
      form.reset();
    } catch (error) {
      console.error(error);
    }
    //setIsOpen(true);
  }
  return (
    <>
      <div className="self-stretch flex flex-col justify-start items-start gap-5">
        <Text variant="heading-medium" className="text-gray-100 self-stretch">
          {!defaultData
            ? "Nova solicitação de reembolso"
            : "Solicitação de reembolso"}
        </Text>
        <Text variant="paragraph-medium-normal" className="text-gray-200">
          Dados da despesa para solicitar reembolso.
        </Text>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="self-stretch flex flex-col justify-start items-start gap-6 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col-reverse w-full gap-2">
                <FormControl>
                  <Input
                    placeholder="Nome da solicitação"
                    className="py-7 px-5 text-lg md:text-lg placeholder:text-lg peer"
                    {...field}
                    disabled={!!defaultData}
                  />
                </FormControl>
                <FormLabel className="text-gray-200 peer-focus:text-green-100 peer-focus:font-bold text-[12px] font-normal uppercase transition-colors leading-4 disabled:opacity-100">
                  NOME DA SOLICITAÇÃO
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="self-stretch inline-flex justify-start items-center gap-4 flex-wrap content-center w-full">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col-reverse gap-2 flex-1 min-w-50">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!!defaultData}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-7 px-5 text-lg md:text-lg peer disabled:opacity-50 disabled:cursor-default">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      position="popper"
                      className="border-2 border-gray-300"
                    >
                      <SelectItem value="food">Alimentação</SelectItem>
                      <SelectItem value="hosting">Hospedagem</SelectItem>
                      <SelectItem value="transport">Transporte</SelectItem>
                      <SelectItem value="services">Serviços</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormLabel className="text-gray-200 peer-data-[state=open]:text-green-100 peer-data-[state=open]:font-bold text-[12px] font-normal uppercase transition-colors leading-4">
                    CATEGORIA
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="flex flex-col-reverse gap-2 group">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="0,00"
                      className="py-7 px-5 text-lg md:text-lg placeholder:text-lg peer"
                      disabled={!!defaultData}
                      {...field}
                    />
                  </FormControl>
                  <FormLabel className="text-gray-200 peer-focus:text-green-100 peer-focus:font-bold text-[12px] font-normal uppercase transition-colors leading-4">
                    VALOR
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!defaultData && (
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem className="w-full flex flex-col-reverse gap-2 group">
                  <FormControl>
                    <InputSingleFile
                      form={form}
                      allowedExtensions={["pdf"]}
                      maxFileSizeInMB={2}
                      {...fieldProps}
                      onChange={(event) => {
                        onChange(event.target.files);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-gray-200 group-focus-within:text-green-100 group-focus-within:font-bold text-[12px] font-normal uppercase transition-colors leading-4">
                    COMPROVANTE
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {fileUrl && (
            <div className="flex gap-3 items-center justify-center w-full p-3">
              <Icon svg={FileImageIcon} className="fill-green-100 w-6 h-6" />
              <div className="truncate max-w-80">
                <a
                  href={fileUrl.url}
                  download
                  className="text-placeholder text-sm text-green-100 font-semibold "
                >
                  Abrir Comprovante
                </a>
              </div>
            </div>
          )}
          {!defaultData ? (
            <Button type="submit" className="w-full p-7 font-semibold text-lg">
              Enviar
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full p-7 font-semibold text-lg"
              onClick={() => setIsOpen(true)}
            >
              Excluir
            </Button>
          )}
        </form>
      </Form>
      {defaultData && (
        <DialogDeleteConfirmation
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          id={defaultData?.refund.id}
        />
      )}
    </>
  );
}
