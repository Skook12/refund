import FilterMain from "@/context/main/components/filter";
import ListMain from "@/context/main/components/list";
import PaginationMain from "@/context/main/components/pagination";
import useSolicitacoes from "@/context/solicitacao/hooks/use-solicitacoes";

export default function Home() {
  const { data, setPage, setQ } = useSolicitacoes();

  return (
    <div className=" p-10 w-full bg-gray-50 rounded-2xl inline-flex flex-col justify-center items-center gap-6">
      <FilterMain setSeachQ={setQ} />
      <ListMain list={data} />
      <PaginationMain
        currentPage={data?.refunds.meta.currentPage}
        lastPage={data?.refunds.meta.lastPage}
        changePage={setPage}
      />
    </div>
  );
}
