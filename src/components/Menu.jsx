import { LuCheck, LuHouse, LuListCheck, LuListTodo, LuShoppingCart, LuStore, LuUser } from "react-icons/lu";
import { NavLink } from "react-router";

const Menu = () => {
    return (
        <div className="p-4">
            <div className="flex *:flex-1 px-6 py-4 items-center bg-roxo rounded-[40px]">
                <NavLink end to = {"/admin"} className="flex flex-col items-center text-white [&.active]:text-vermelho group">
                    <LuHouse size = {24} />
                    <span className="hidden group-[&.active]:block">
                        Home
                    </span>
                </NavLink>
                <NavLink end to = {"/admin/missoes"} className="flex flex-col items-center  text-white [&.active]:text-vermelho group">
                    <LuListTodo size = {24} />
                    <span className="hidden group-[&.active]:block"> 
                        Missões
                    </span>
                </NavLink>
                <NavLink end to = {"/admin/produtos"} className="flex flex-col items-center  text-white [&.active]:text-vermelho group">
                    <LuShoppingCart size = {24}/>
                    <span className="hidden group-[&.active]:block">
                        Produtos
                    </span>
                </NavLink>
                <NavLink end to = {"/admin/concorrentes"} className="flex flex-col items-center  text-white [&.active]:text-vermelho group">
                    <LuStore size = {24}/>
                    <span className="hidden group-[&.active]:block">
                        Concorrentes
                    </span>
                </NavLink>
                <NavLink end to = {"/admin/usuarios"} className="flex flex-col items-center  text-white [&.active]:text-vermelho group">
                    <LuUser size = {24}/>
                    <span className="hidden group-[&.active]:block">
                        Usuários
                    </span>
                </NavLink>


            </div>
        </div>
    );
}

export default Menu