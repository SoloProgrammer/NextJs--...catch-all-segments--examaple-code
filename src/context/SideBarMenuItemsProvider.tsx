"use client";
import { ReactNode, createContext, useContext } from "react";
import { tabs } from "@/data/data";
import { TabTypes } from "@/types/SideBarTypes";

type ProviderTypes = {
  rootMenus: TabTypes[];
  getMenus: (id: string) => TabTypes[];
  hasChildrens: (id: string) => boolean;
};
const MenuContext = createContext<ProviderTypes | null>(null);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  function getMenus(parentId: string) {
    const menusById: Record<string, any[]> = {};

    tabs.forEach((t) => {
      if (!menusById[t.parentId || "root"]) {
        menusById[t?.parentId || "root"] = [t];
      } else menusById[t?.parentId || "root"].push(t);
    });

    return menusById[parentId || "root"];
  }

  let rootMenus = getMenus("root");

  function hasChildrens(id: string) {
    return getMenus(id)?.length > 0;
  }

  return (
    <MenuContext.Provider value={{ rootMenus, getMenus, hasChildrens }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenus = () => useContext(MenuContext) as ProviderTypes;
