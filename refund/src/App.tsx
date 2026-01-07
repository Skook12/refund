import { BrowserRouter, Route, Routes } from "react-router";
import LayoutMain from "./core-components/layout-main";
import Home from "./pages/page-home";
import Solicitacoes from "./pages/page-solicitacoes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<Home />} />
            <Route path="/solicitacao" element={<Solicitacoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
