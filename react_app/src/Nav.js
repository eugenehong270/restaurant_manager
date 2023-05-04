import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div className="container pt-5">
      <div className="row gy-4">
        <div className="col-md-3 col-sm-6">
          <div className="card nav-card">
            <div className="card-body text-center">
              <h5 className="card-title">Home</h5>
              <NavLink
                className="card-link d-block"
                activeClassName="active"
                to="/"
              >
                MainPage
              </NavLink>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card nav-card">
            <div className="card-body text-center">
              <h5 className="card-title">Warehouse</h5>
              <NavLink
                className="card-link d-block"
                activeClassName="active"
                to="/warehouse"
              >
                View Warehouses
              </NavLink>
              <NavLink
                className="card-link d-block"
                activeClassName="active"
                to="/warehouse/new"
              >
                Create Warehouse
              </NavLink>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card nav-card">
            <div className="card-body text-center">
              <h5 className="card-title">Inventory</h5>
              <NavLink
                className="card-link d-block"
                to="/inventory"
              >
                View Inventory
              </NavLink>
              <NavLink
                className="card-link d-block"
                to="/inventory/new"
              >
                Add to Inventory
              </NavLink>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card nav-card">
            <div className="card-body text-center">
              <h5 className="card-title">Restaurant</h5>
              <NavLink
                className="card-link d-block"
                to="/restaurant"
              >
                View Restaurants
              </NavLink>
              <NavLink
                className="card-link d-block"
                to="/restaurant/new"
              >
                Create a Restaurant
              </NavLink>
              <NavLink
                className="card-link d-block"
                to="/restaurant/order"
              >
                Place an Order
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
