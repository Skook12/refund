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
import { useState } from "react";
import { DialogDeleteConfirmation } from "./confirmation-delete-dialog";
import FilePreview from "@/components/file-preview";

interface FormSolicitacaoProps {
  setSucess: (item: boolean) => void;
}

export default function FormSolicitacao({ setSucess }: FormSolicitacaoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<SolicitacaoFormSchema>({
    resolver: zodResolver(solicitacaoFormSchema),
    defaultValues: {
      name: "",
      category: "",
      value: "",
      file: undefined,
    },
  });
  const file = form.watch("file");
  const fileScource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;
  function onSubmit(values: SolicitacaoFormSchema) {
    console.log(values);
    //setSucess(true);
    setIsOpen(true);
  }
  return (
    <>
      <div className="self-stretch flex flex-col justify-start items-start gap-5">
        <Text variant="heading-medium" className="text-gray-100 self-stretch">
          Nova solicitação de reembolso
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
                  />
                </FormControl>
                <FormLabel className="text-gray-200 peer-focus:text-green-100 peer-focus:font-bold text-[12px] font-normal uppercase transition-colors leading-4">
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
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-7 px-5 text-lg md:text-lg peer">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      position="popper"
                      className="border-2 border-gray-300"
                    >
                      <SelectItem value="food">Alimentação</SelectItem>
                      <SelectItem value="hotel">Hospedagem</SelectItem>
                      <SelectItem value="transport">Transporte</SelectItem>
                      <SelectItem value="services">Serviços</SelectItem>
                      <SelectItem value="others">Outros</SelectItem>
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

          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="w-full flex flex-col-reverse gap-2 group">
                <FormControl>
                  <InputSingleFile
                    form={form}
                    allowedExtensions={["pdf"]}
                    maxFileSizeInMB={10}
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

          <Button type="submit" className="w-full p-7 font-semibold text-lg">
            Enviar
          </Button>
        </form>
      </Form>
      <DialogDeleteConfirmation setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
}
