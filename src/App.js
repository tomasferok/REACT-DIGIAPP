import logo from './logo.svg';
import './App.css';

import ProddLi from './Componentes/ProddLi';
import ProductoList from './Componentes/ProductoList';

function App() {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">DigiBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active"><a className="nav-link" href="#">Home
              <span className="sr-only"></span>
            </a></li>
            <li className="nav-item"><a className="nav-link" >Listado de Productos</a>
            </li>
          </ul>
        </div>
      </nav>

      <ProddLi/>
    </div>
  );
}

export default App;
