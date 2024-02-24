import "./navbar.css" 
import logo from "../../assets/logo/alpaclean.png"
function Navbar(){

function ApagarToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.href = '/login';
}

return <div className="navbar">
            <img src={logo} className="logotipo" alt="logotipo" />

            <div className="menu">
                <button className="botao">
                    <a href="/fazer" >Minha Empresa</a>
                </button>
                <button onClick={ApagarToken} className="botao"> <a href="/login" >SAIR</a></button>
            </div>
        </div>
                 

 

}

export default Navbar;