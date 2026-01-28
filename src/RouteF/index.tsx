import { Sidebar } from "../pages";
import { BrowserRouter } from "react-router-dom";
const RouteF = () => {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    </>
  );
};

export { RouteF };
