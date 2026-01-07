import ButtonIcon from "@/components/ui/button-icon";
import CaretRightIcon from "../../../assets/caret-right.svg?react";
import CaretLeftIcon from "../../../assets/caret-left.svg?react";
import Text from "../../../components/text";

interface PaginationMain {
  currentPage?: number;
  lastPage?: number;
  changePage: (item: number) => void;
}

export default function PaginationMain({
  currentPage,
  lastPage,
  changePage,
}: PaginationMain) {
  return (
    <div className="inline-flex justify-start items-center gap-2.5">
      <ButtonIcon
        icon={CaretLeftIcon}
        onClick={() =>
          currentPage && currentPage > 1 && changePage(currentPage - 1)
        }
      />
      <Text variant="pagination-label">
        {currentPage}/{lastPage}
      </Text>
      <ButtonIcon
        icon={CaretRightIcon}
        onClick={() =>
          currentPage &&
          lastPage &&
          lastPage > currentPage &&
          changePage(currentPage + 1)
        }
      />
    </div>
  );
}
