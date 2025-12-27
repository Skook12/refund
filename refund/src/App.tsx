import { BrowserRouter, Route, Routes } from "react-router";
import LayoutMain from "./core-components/layout-main";
import Home from "./pages/page-home";
import Solicitacoes from "./pages/page-solicitacoes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index element={<Home />} />
          <Route path="/solicitacao" element={<Solicitacoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
