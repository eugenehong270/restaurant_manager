import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryForm() {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sku, setSku] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchWarehouses() {
      const response = await axios.get('http://localhost:8000/api/warehouses/');
      setWarehouses(response.data);
    }
    fetchWarehouses();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/inventory/', {
        warehouse: selectedWarehouse,
        item_name: itemName,
        quantity,
        sku,
      });
      setMessage('Inventory added successfully!');
      setSelectedWarehouse('');
      setItemName('');
      setQuantity('');
      setSku('');
    } catch (error) {
      setMessage('Error: Could not add inventory');
    }
  }

  return (
    <div>
      <h1>Add Inventory</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="warehouse">Warehouse:</label>
          <select
            id="warehouse"
            value={selectedWarehouse}
            onChange={(event) => setSelectedWarehouse(event.target.value)}
          >
            <option value="">Select a warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="item-name">Item Name:</label>
          <input
            type="text"
            id="item-name"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
          />
        </div>
        <button type="submit">Add Inventory</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default InventoryForm;
