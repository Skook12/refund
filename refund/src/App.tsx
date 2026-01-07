import { BrowserRouter, Route, Routes } from "react-router";
import LayoutMain from "./core-components/layout-main";
import Home from "./pages/page-home";
import Solicitacoes from "./pages/page-solicitacoes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<Home />} />
            <Route path="/solicitacao" element={<Solicitacoes />} />
            <Route path="/solicitacao/:id" element={<Solicitacoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
