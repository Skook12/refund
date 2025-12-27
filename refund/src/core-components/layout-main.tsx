import { Outlet } from "react-router";
import Header from "./header";
import MainContent from "./main-content";

export default function LayoutMain() {
  return (
    <div className="px-2 md:px-22.5 py-10 min-h-screen flex flex-col items-center">
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}
