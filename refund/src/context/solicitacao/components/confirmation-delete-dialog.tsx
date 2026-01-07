import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSolicitacoes from "../hooks/use-solicitacoes";

interface DialogDeleteConfirmationProps {
  isOpen: boolean;
  setIsOpen: (item: boolean) => void;
  id: string;
}

export function DialogDeleteConfirmation({
  isOpen,
  setIsOpen,
  id,
}: DialogDeleteConfirmationProps) {
  const { deleteSolicitacao } = useSolicitacoes();
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="min-w-2xl p-10 bg-gray-500 rounded-2xl inline-flex flex-col gap-6"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Excluir solicitação
          </DialogTitle>
          <DialogDescription className="text-gray-200 text-lg font-normal">
            Tem certeza que deseja excluir essa solicitação? Essa ação é
            irreversível.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex items-center justify-end gap-6">
          <DialogClose asChild>
            <Button
              variant="link"
              type="button"
              className="text-xl font-semibold text-green-100 leading-4"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="p-7 font-semibold text-lg"
            onClick={() => deleteSolicitacao(id)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
