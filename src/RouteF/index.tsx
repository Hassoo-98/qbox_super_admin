import { Sidebar } from "../pages";
import { BrowserRouter } from "react-router-dom";
const RouteF = () => {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    </div>
  )
}

export { RouteF } 
