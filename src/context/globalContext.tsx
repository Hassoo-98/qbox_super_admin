import React, { createContext, useContext, useState } from "react";

type ModalsState = {
  staffUpdate: boolean;
  staffDelete: boolean;
  staffStatus: boolean;
  homeOwnerStatus:boolean;
};

type TableSelectedIds = {
  staffSelectedId: string | null;
  homeOwnerSelectedId:string | null
};

type GlobalContextType = {
  modals: ModalsState;
  setModals: React.Dispatch<React.SetStateAction<ModalsState>>;
  tableSelectedIds: TableSelectedIds;
  setTableSelectedIds: React.Dispatch<React.SetStateAction<TableSelectedIds>>;
};

const initialModals: ModalsState = {
  staffUpdate: false,
  staffDelete: false,
  staffStatus: false,
  homeOwnerStatus:false
};

const initialTableSelectedIds: TableSelectedIds = {
  staffSelectedId: null,
  homeOwnerSelectedId:null
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [modals, setModals] = useState<ModalsState>(initialModals);
  const [tableSelectedIds, setTableSelectedIds] = useState<TableSelectedIds>(initialTableSelectedIds);

  return (
    <GlobalContext.Provider
      value={{
        modals,
        setModals,
        tableSelectedIds,
        setTableSelectedIds,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  }
  return context;
};
