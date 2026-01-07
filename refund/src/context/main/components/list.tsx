import ListIconMain from "./list-item";
import type { Solicitacao } from "@/context/solicitacao/models/solicitacao";

interface ListMainProps {
  list?: Solicitacao;
}

export default function ListMain({ list }: ListMainProps) {
  return (
    <div className="self-stretch flex flex-col justify-center items-start gap-4">
      {list?.refunds.data.map((item) => (
        <ListIconMain
          key={item.id}
          title={item.title}
          category={item.category}
          value={item.value}
          id={item.id}
        />
      ))}
    </div>
  );
}
