import FormSolicitacao from "@/context/solicitacao/components/forms";
import SucessConfirmation from "@/context/solicitacao/components/sucess";
import useSolicitacao from "@/context/solicitacao/hooks/use-solicitacao";
import { useState } from "react";
import { useParams } from "react-router";

export default function Solicitacoes() {
  const [solicitacaoConcluida, setSolicitacaoConcluida] = useState(false);
  const params = useParams();
  const { data } = useSolicitacao(params?.id);

  return (
    <div className="w-2xl p-14 bg-gray-50 rounded-2xl inline-flex flex-col justify-start items-start gap-10">
      {!solicitacaoConcluida ? (
        <FormSolicitacao
          setSucess={setSolicitacaoConcluida}
          defaultData={data}
        />
      ) : (
        <SucessConfirmation setSucess={setSolicitacaoConcluida} />
      )}
    </div>
  );
}
