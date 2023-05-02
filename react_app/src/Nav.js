import { NavLink } from 'react-router-dom';
import './index.css'


function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">

            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                {/* WAREHOUSE */}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"> WAREHOUSE</a>
                      <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/warehouse">View Warehouses</NavLink></li>
                      </ul>
                </li>

                {/* INVENTORY */}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">INVENTORY</a>
                      <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/inventory">View Inventory</NavLink></li>
                      </ul>
                </li>

                {/* IDK YET */}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">SALES</a>
                      <ul className="dropdown-menu">

                      </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      )
}

export default Nav;
