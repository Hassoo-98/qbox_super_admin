import React, { createContext, useContext, useState } from "react";

type ModalsState = {
  staffUpdate: boolean;
  staffDelete: boolean;
  staffStatus: boolean;
  homeOwnerStatus: boolean;
  homeownerDelete: boolean;
  qboxDelete: boolean;
  deleteModal:boolean;
  statusModal:boolean;
};

type TableSelectedIds = {
  staffSelectedId: string | null;
  homeOwnerSelectedId: string | null;
  qboxSelectedId: string | null;
  packageSelectedId: string | null;
  promotionSelectedId: string | null;
};

type SelectedRowStatus = {
  currentStatus: boolean | null;
}
type GlobalContextType = {
  modals: ModalsState;
  setModals: React.Dispatch<React.SetStateAction<ModalsState>>;
  tableSelectedIds: TableSelectedIds;
  setTableSelectedIds: React.Dispatch<React.SetStateAction<TableSelectedIds>>;
  selectedRowStatus: SelectedRowStatus;
  setSelectedRowStatus: React.Dispatch<React.SetStateAction<SelectedRowStatus>>;
  dataRefreshToken: number;
  setDataRefreshToken: React.Dispatch<React.SetStateAction<number>>;
};

const initialModals: ModalsState = {
  staffUpdate: false,
  staffDelete: false,
  staffStatus: false,
  homeOwnerStatus: false,
  homeownerDelete: false,
  qboxDelete: false,
  deleteModal:false,
  statusModal:false,
};

const initialTableSelectedIds: TableSelectedIds = {
  staffSelectedId: null,
  homeOwnerSelectedId: null,
  qboxSelectedId: null,
  packageSelectedId: null,
  promotionSelectedId:null,
};

const intialSelectedRowStatus: SelectedRowStatus = {
  currentStatus: null,
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [modals, setModals] = useState<ModalsState>(initialModals);
  const [tableSelectedIds, setTableSelectedIds] = useState<TableSelectedIds>(initialTableSelectedIds);
  const [selectedRowStatus, setSelectedRowStatus] = useState<SelectedRowStatus>(intialSelectedRowStatus);
  const [dataRefreshToken, setDataRefreshToken] = useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{
        modals,
        setModals,
        tableSelectedIds,
        setTableSelectedIds,
        selectedRowStatus,
        setSelectedRowStatus
        ,
        dataRefreshToken,
        setDataRefreshToken
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
