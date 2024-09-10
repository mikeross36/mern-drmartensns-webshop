import { createContext, useState, useMemo } from "react";
import { ESelectedPage } from "../types/links";

type AppContextType = {
  selectedPage: ESelectedPage;
  setSelectedPage: React.Dispatch<React.SetStateAction<ESelectedPage>>;
  isTopOfPage: boolean;
  setIsTopOfPage: React.Dispatch<React.SetStateAction<boolean>>;
  showMobMenu: boolean;
  setShowMobMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showModalForgot: boolean;
  setShowModalForgot: React.Dispatch<React.SetStateAction<boolean>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext({} as AppContextType);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPage, setSelectedPage] = useState<ESelectedPage>(
    ESelectedPage.home
  );
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [showMobMenu, setShowMobMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showModalForgot, setShowModalForgot] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const value = useMemo(() => {
    return {
      selectedPage,
      setSelectedPage,
      isTopOfPage,
      setIsTopOfPage,
      showMobMenu,
      setShowMobMenu,
      showSearch,
      setShowSearch,
      showModalForgot,
      setShowModalForgot,
      isCartOpen,
      setIsCartOpen,
    };
  }, [
    selectedPage,
    setSelectedPage,
    isTopOfPage,
    setIsTopOfPage,
    showMobMenu,
    setShowMobMenu,
    showSearch,
    setShowSearch,
    showModalForgot,
    setShowModalForgot,
    isCartOpen,
    setIsCartOpen,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
