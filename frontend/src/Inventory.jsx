import { useState, useEffect } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const [warehouseOptions, setWarehouseOptions] = useState([]);

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

  useEffect(() => {
    async function fetchWarehouses() {
      const response = await axios.get('http://localhost:8000/api/warehouses/');
      setWarehouseOptions(response.data);
    }
    fetchWarehouses();
  }, []);

  async function handleWarehouseChange(event) {
    setSelectedWarehouse(event.target.value);
  }

  const items = {};
  inventory.forEach((item) => {
    if (items[item.sku]) {
      items[item.sku].quantity += item.quantity;
    } else {
      items[item.sku] = {
        itemName: item.item_name,
        quantity: item.quantity,
      };
    }
  });

  return (
    <div>
      <h1>Inventory</h1>
      <label htmlFor="warehouse-select">Select a warehouse:</label>
      <select
        id="warehouse-select"
        value={selectedWarehouse}
        onChange={handleWarehouseChange}
      >
        <option value="">All Warehouses</option>
        {warehouseOptions.map((warehouse) => (
          <option
            key={warehouse.id}
            value={warehouse.id}
          >
            {warehouse.name}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>SKU</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items).map((sku) => (
            <tr key={sku}>
              <td>{items[sku].itemName}</td>
              <td>{sku}</td>
              <td>{items[sku].quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
