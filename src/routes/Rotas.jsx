import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/auth/Login";
import Recuperar from "../pages/auth/Recuperar";
import Painel from "../pages/admin/Painel";
import Usuarios from "../pages/admin/Usuarios";
import AdminLayout from "../layouts/AdminLayout";
import Concorrentes from "../pages/admin/Concorrentes";

const Rotas = () => {
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Login/>}/>
            <Route path = "/recuperar" element = {<Recuperar/>}/>
            <Route path = "/admin" element = {<AdminLayout/>}>
                <Route index element = {<Painel/>}/>
                <Route path = "/admin/usuarios" element = {<Usuarios/>}/>
                <Route path = "/admin/concorrentes" element = {<Concorrentes/>}/>
            </Route>
            
        </Routes>
        </BrowserRouter>
     );
}
 
export default Rotas;