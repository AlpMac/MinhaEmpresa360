import {Link} from 'react-router-dom';

function MenuLateral (){
    return <div className="d-flex flex-column flex-shrink-0 p-3 bg-with mt-2" >
    
   
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">Principal</Link>
    
      </li>
      <li className="nav-item">
        <Link to="/Servico" className="nav-link link-dark" >Serviços</Link>
    
      </li>
      <li>
        <Link to="/Clientes" className="nav-link link-dark">Clientes</Link>
                  
      </li>
      <li>
        <Link to="#" className="nav-link link-dark">Gerenciar Produto</Link>

        
      </li>
      <li>
        <Link to="#" className="nav-link link-dark">Relatórios</Link>
          
        
      </li>
      <li>
        <Link to="#" className="nav-link link-dark">Funcionários</Link>
                 
      </li>
    </ul>
 </div>
     
    
}

export default MenuLateral