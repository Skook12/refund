import { cva, type VariantProps } from "class-variance-authority";
import Icon from "./icon";
import Text, { textVariants } from "./text";
import UploadFileIcon from "../assets/cloud-arrow-up.svg?react";
import FileImageIcon from "../assets/file.svg?react";
import { useMemo, type ComponentProps, type ReactNode } from "react";
import { useWatch } from "react-hook-form";

export const inputSingleFileVariants = cva(
  `
    flex  items-center justify-between w-full h-full
    border border-solid border-border-primary
    group-hover:border-border-active 
    rounded-md gap-1 min-w-0  border-gray-300 bg-transparent 
    shadow-xs transition-[color,box-shadow]
    group-focus-within:border-green-100 
    group-focus-within:border-2
     placeholder:text-muted-foreground
    `,
  {
    variants: {
      size: {
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const inputSingleFileIconVariants = cva("fill-placeholder fill-white ", {
  variants: {
    size: {
      md: "w-10 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputSingleFileProps
  extends VariantProps<typeof inputSingleFileVariants>,
    Omit<ComponentProps<"input">, "size"> {
  form: any;
  allowedExtensions: string[];
  maxFileSizeInMB: number;
  error?: ReactNode;
}

export default function InputSingleFile({
  size,
  error,
  form,
  allowedExtensions,
  maxFileSizeInMB,
  ...props
}: InputSingleFileProps) {
  const formValues = useWatch({ control: form.control });
  const name = props.name || "";
  const formFile: File = useMemo(
    () => formValues[name]?.[0],
    [formValues, name]
  );

  const { fileExtensions, fileSize } = useMemo(
    () => ({
      fileExtensions: formFile?.name?.split(".")?.pop()?.toLowerCase() || "",
      fileSize: formFile?.size || 0,
    }),
    [formFile]
  );

  function isValidExtensions() {
    return allowedExtensions.includes(fileExtensions);
  }

  function isValidSize() {
    return fileSize <= maxFileSizeInMB * 1024 * 1024;
  }

  function isValidFile() {
    return isValidExtensions() && isValidSize();
  }
  return (
    <div>
      {!formFile || !isValidFile() ? (
        <>
          <div className="w-full relative group cursor-pointer">
            <input
              type="file"
              className={`
            absolute top-0 right-0
            w-full h-full opacity-0 cursor-pointer peer
            `}
              {...props}
            />
            <div className={inputSingleFileVariants({ size })}>
              <div className="pl-2 md:pl-5 md:py-4">
                <Text
                  variant="label-input"
                  className="text-placeholder text-center text-muted-foreground"
                >
                  Nome do arquivo.pdf
                </Text>
              </div>
              <div className="h-16 w-16 flex items-center justify-center bg-green-100 rounded-sm overflow-hidden ">
                <Icon
                  svg={UploadFileIcon}
                  className={inputSingleFileIconVariants({ size })}
                />
              </div>
            </div>
          </div>
          {formFile && !isValidExtensions() && (
            <Text variant="heading-small" className="text-accent-red">
              Tipo do Arquivo Inválido
            </Text>
          )}
          {formFile && !isValidSize() && (
            <Text variant="heading-small" className="text-accent-red">
              O tamanho do arquivo ultrapassa o máximo
            </Text>
          )}
          {error && (
            <Text variant="heading-small" className="text-accent-red">
              {error}
            </Text>
          )}
        </>
      ) : (
        <>
          <div className="flex gap-3 items-center justify-center p-3">
            <Icon svg={FileImageIcon} className="fill-green-100 w-6 h-6" />
            <div className="truncate max-w-80">
              <Text className="text-placeholder text-sm text-green-100">
                {formFile.name}
              </Text>
            </div>
          </div>

          <div className="flex justify-center text-red-600">
            <button
              type="button"
              className={textVariants({
                variant: "heading-small",
                className: "text-accent-red cursor-pointer hover:underline",
              })}
              onClick={() => {
                form.setValue(name, undefined);
              }}
            >
              Remover
            </button>
          </div>
        </>
      )}
    </div>
  );
}
