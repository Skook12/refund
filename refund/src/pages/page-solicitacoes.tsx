import FormSolicitacao from "@/context/solicitacao/components/forms";
import SucessConfirmation from "@/context/solicitacao/components/sucess";
import { useState } from "react";

export default function Solicitacoes() {
  const [solicitacaoConcluida, setSolicitacaoConcluida] = useState(false);
  return (
    <div className="w-2xl p-14 bg-gray-50 rounded-2xl inline-flex flex-col justify-start items-start gap-10">
      {!solicitacaoConcluida ? (
        <FormSolicitacao setSucess={setSolicitacaoConcluida} />
      ) : (
        <SucessConfirmation setSucess={setSolicitacaoConcluida} />
      )}
    </div>
  );
}
