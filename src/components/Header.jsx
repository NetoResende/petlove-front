import logo from '../assets/logo.png';
import perfil from '../assets/caxorro.jpg';
const Header = () => {
    return ( 
        <div className='flex justify-between p-4 items-center'>
            <img className="h-10 mix-blend-multiply"src={logo} alt="Logo" />
            <img className="w-10 h-10 rounded-full object-cover" src={perfil} alt="Perfil" />
        </div>
     );
}
 
export default Header;