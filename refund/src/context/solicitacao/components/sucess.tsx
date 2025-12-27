import Icon from "@/components/icon";
import Text from "@/components/text";
import SucessIcon from "../../../assets/sucess.svg?react";
import { Button } from "@/components/ui/button";

interface SucessConfirmationProps {
  setSucess: (item: boolean) => void;
}

export default function SucessConfirmation({
  setSucess,
}: SucessConfirmationProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-green-100 w-full gap-10">
      <Text variant="heading-lg" className=" self-stretch">
        Solicitação enviada!
      </Text>

      <Icon svg={SucessIcon} className="w-34 h-34" />

      <Text variant="heading-xl" className=" self-stretch font-normal">
        Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o
        setor financeiro irá entrar em contato com você.
      </Text>
      <Button
        className="w-full p-7 font-semibold text-lg"
        onClick={() => setSucess(false)}
      >
        Nova Solicitação
      </Button>
    </div>
  );
}
