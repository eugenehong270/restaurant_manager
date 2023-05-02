import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  useEffect(() => {
    async function fetchInventory() {
      let url = 'http://localhost:8000/api/inventory/';
      if (selectedWarehouse !== '') {
        url += `?warehouse=${selectedWarehouse}`;
      }
      const response = await axios.get(url);
      setInventory(response.data);
    }
    fetchInventory();
  }, [selectedWarehouse]);

  async function handleWarehouseChange(event) {
    setSelectedWarehouse(event.target.value);
  }

  return (
    <div>
      <h1>Inventory</h1>
      <label htmlFor="warehouse-select">Select a warehouse:</label>
      <select id="warehouse-select" value={selectedWarehouse} onChange={handleWarehouseChange}>
        <option value="">All Warehouses</option>
        <option value="1">Warehouse 1</option>
        <option value="2">Warehouse 2</option>
        <option value="3">Warehouse 3</option>
        {/* Add more options here as needed */}
      </select>
      <table>
        <thead>
          <tr>
            <th>Warehouse</th>
            <th>Item Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.warehouse.name}</td>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
