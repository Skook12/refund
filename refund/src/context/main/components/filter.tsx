import { Input } from "@/components/ui/input";
import Text from "@/components/text";
import SearchIcon from "../../../assets/magnifying-glass.svg?react";
import ButtonIcon from "@/components/ui/button-icon";
import { useState } from "react";

interface FilterMainProps {
  setSeachQ: (item: string) => void;
}

export default function FilterMain({ setSeachQ }: FilterMainProps) {
  const [name, setName] = useState("");
  return (
    <>
      <Text variant="heading-medium" className="text-gray-100 self-stretch">
        Solicitações
      </Text>
      <div className="self-stretch h-16 mt-4 pr-3 pb-9 border-b border-gray-400 inline-flex justify-start items-center gap-3">
        <div className="flex-1 self-stretch flex justify-start items-center gap-3">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <Input
              className="self-stretch h-12 pl-4 rounded-lg outline  outline-offset- outline-neutral-300"
              placeholder="Pesquise pelo nome"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <ButtonIcon
            icon={SearchIcon}
            className="w-12 h-12 "
            onClick={() => setSeachQ(name)}
          />
        </div>
      </div>
    </>
  );
}
