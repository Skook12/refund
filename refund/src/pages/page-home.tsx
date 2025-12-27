import FilterMain from "@/context/main/components/filter";
import ListMain from "@/context/main/components/list";
import PaginationMain from "@/context/main/components/pagination";

export default function Home() {
  return (
    <div className=" p-10 w-full bg-gray-50 rounded-2xl inline-flex flex-col justify-center items-center gap-6">
      <FilterMain />
      <ListMain />
      <PaginationMain />
    </div>
  );
}
