import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import MainPage from './MainPage';

import Nav from './Nav';

import Warehouse from './WareHouse';
import WarehouseForm from './WarehouseForm';

import Inventory from './Inventory';
import InventoryForm from './InventoryForm'

import Restaurant from './Restaurant';
import RestaurantForm from './RestaurantForm';
import OrderForm from './OrderForm';







function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* main page */}
        <Route path="/" element={<MainPage />} />


        {/* warehouse */}
        <Route path="warehouse">
          <Route path="" element={<Warehouse />} />
        </Route>

        <Route path="warehouseform">
          <Route path="" element={<WarehouseForm />} />
        </Route>



        <Route path="inventory">
          <Route path="" element={<Inventory />} />
        </Route>
        <Route path="inventoryform">
          <Route path="" element={<InventoryForm />} />
        </Route>

        <Route path="restaurant">
          <Route path="" element={<Restaurant />} />
        </Route>
        <Route path="restaurantform">
          <Route path="" element={<RestaurantForm />} />
        </Route>
        <Route path="orderform">
          <Route path="" element={<OrderForm />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}


export default App;
