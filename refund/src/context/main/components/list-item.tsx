import Icon from "@/components/icon";
import ForkKnifeIcon from "../../../assets/fork-knife-fill.svg?react";
import BedIcon from "../../../assets/bed-fill.svg?react";
import CarIcon from "../../../assets/police-car-fill.svg?react";
import WrenchIcon from "../../../assets/wrench-fill.svg?react";
import ReceiptIcon from "../../../assets/receipt-fill.svg?react";
import Text from "@/components/text";
import { useNavigate } from "react-router";

interface ListIconMainProps {
  title: string;
  category: string;
  value: number;
  id: string;
}

const categoryIcons: Record<string, typeof ForkKnifeIcon> = {
  food: ForkKnifeIcon,
  hosting: BedIcon,
  transport: CarIcon,
  services: WrenchIcon,
  other: ReceiptIcon,
};

export default function ListIconMain({
  title,
  category,
  value,
  id,
}: ListIconMainProps) {
  const iconItem = categoryIcons[category] || ReceiptIcon;
  const navigate = useNavigate();
  return (
    <div
      className="self-stretch py-0.5 inline-flex justify-between items-center hover:opacity-50"
      onClick={() => navigate(`/solicitacao/${id}`)}
    >
      <div className="flex justify-start items-center gap-3">
        <div className="p-2 bg-gray-300 rounded-full flex justify-center items-center gap-2">
          <Icon svg={iconItem} className="w-6 h-6 fill-green-100" />
        </div>
        <div className="inline-flex flex-col justify-center items-start gap-1">
          <Text variant="paragraph-medium">{title}</Text>
          <Text variant="paragraph-small" className="text-gray-200">
            {category}
          </Text>
        </div>
      </div>
      <div className="flex justify-start items-baseline gap-1">
        <div className="text-right justify-center text-zinc-600 text-sm font-normal font-['Open_Sans'] capitalize leading-4">
          R$
        </div>
        <div className="text-right justify-center text-neutral-800 text-[16px] font-semibold font-['Open_Sans'] leading-4">
          {value}
        </div>
      </div>
    </div>
  );
}
