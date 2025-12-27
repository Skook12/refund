import Icon from "@/components/icon";
import ForkKnifeIcon from "../../../assets/fork-knife-fill.svg?react";
import Text from "@/components/text";

export default function ListIconMain() {
  return (
    <div className="self-stretch py-0.5 inline-flex justify-between items-center">
      <div className="flex justify-start items-center gap-3">
        <div className="p-2 bg-gray-300 rounded-full flex justify-center items-center gap-2">
          <Icon svg={ForkKnifeIcon} className="w-6 h-6 fill-green-100" />
        </div>
        <div className="inline-flex flex-col justify-center items-start gap-1">
          <Text variant="paragraph-medium">Rodrigo</Text>
          <Text variant="paragraph-small" className="text-gray-200">
            Alimentação
          </Text>
        </div>
      </div>
      <div className="flex justify-start items-baseline gap-1">
        <div className="text-right justify-center text-zinc-600 text-sm font-normal font-['Open_Sans'] capitalize leading-4">
          R$
        </div>
        <div className="text-right justify-center text-neutral-800 text-[16px] font-semibold font-['Open_Sans'] leading-4">
          34,78
        </div>
      </div>
    </div>
  );
}
