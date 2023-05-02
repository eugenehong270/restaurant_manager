import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Warehouse from './WareHouse';
import Inventory from './Inventory';
import 'bootstrap/dist/css/bootstrap.css';


import MainPage from './MainPage';


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

        <Route path="inventory">
          <Route path="" element={<Inventory />} />
        </Route>



      </Routes>
    </BrowserRouter>
  );
}


export default App;
