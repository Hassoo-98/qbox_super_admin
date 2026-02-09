import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
 const [modals,setModals]=({
    staffUpdate:false,
    staffDelete:false,
    staffStatus:false
 })
 const [tableSelectedIds,setTableSelectedIds]=useState({
  staffSelectedId:null
 })

  return (
    <GlobalContext.Provider
      value={{
       modals,
       setModals,
       tableSelectedIds,
       setTableSelectedIds
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook (clean usage)
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  }
  return context;
};
