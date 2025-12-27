import Icon from "@/components/icon";
import Logo from "../assets/Logo.svg?react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <>
      <div className="w-full inline-flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
        <Icon svg={Logo} className="w-30 h-10" />
        <div className="flex justify-start items-center gap-4">
          <div className="px-5 py-3 flex justify-center items-center gap-3">
            <NavLink
              to="/"
              className="justify-center text-emerald-700 text-[16px] font-semibold leading-6"
            >
              Solicitações de reembolso
            </NavLink>
          </div>
          <NavLink to="/solicitacao">
            <Button className="p-7 font-semibold text-lg">
              Nova solicitação
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  );
}
