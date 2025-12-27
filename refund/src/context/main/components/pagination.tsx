import ButtonIcon from "@/components/ui/button-icon";
import CaretRightIcon from "../../../assets/caret-right.svg?react";
import CaretLeftIcon from "../../../assets/caret-left.svg?react";
import Text from "../../../components/text";

export default function PaginationMain() {
  return (
    <div className="inline-flex justify-start items-center gap-2.5">
      <ButtonIcon icon={CaretLeftIcon} />
      <Text variant="pagination-label">1/3</Text>
      <ButtonIcon icon={CaretRightIcon} />
    </div>
  );
}
