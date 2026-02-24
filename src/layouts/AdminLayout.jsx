import { Outlet } from "react-router";
import Header from "../components/Header";
import Menu from "../components/Menu";

const AdminLayout = () => {
    return ( 
        <div className="bg-areia h-dvh flex flex-col">
         <Header/>
         <div className="grow p-4">
            <Outlet/>
         </div>
         <Menu/>    
        </div>
     );
}

export default AdminLayout;