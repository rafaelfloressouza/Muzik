import React, { useState } from "react";
import { CategoryType, PageType } from "../utils/types";

export type AppContextType = {
  page: PageType;
  setPage: (page: PageType) => void;
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  const setPage = (page: PageType) => setValue({ ...value, page: page });

  const setCategory = (category: CategoryType) =>
    setValue({ ...value, category: category });

  const setSidebarExpanded = (expanded: boolean) =>
    setValue({ ...value, sidebarExpanded: expanded });

  const setSidebarCollapsed = (collapsed: boolean) =>
    setValue({ ...value, sidebarCollapsed: collapsed });

  const [value, setValue] = useState<AppContextType>({
    page: PageType.Home,
    setPage: setPage,
    category: CategoryType.Playlists,
    setCategory: setCategory,
    sidebarExpanded: false,
    setSidebarExpanded: setSidebarExpanded,
    sidebarCollapsed: false,
    setSidebarCollapsed: setSidebarCollapsed,
  });
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
