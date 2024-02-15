import "./navbar.css" 
import logo from "../../assets/logo/alpaclean.png"
function Navbar(){

return <div className="navbar">
            <img src={logo} className="logotipo" alt="logotipo" />

            <div className="menu">
                <button className="botao">
                    <a href="#" >Minha Empresa</a>
                </button>
            </div>
        </div>
                 

 

}

export default Navbar;