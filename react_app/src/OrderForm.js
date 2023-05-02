import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function OrderForm() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await axios.get('http://localhost:8000/api/restaurants/');
        setRestaurants(response.data);
      } catch (error) {
        setMessage('Error: Could not retrieve restaurants');
      }
    }
    fetchRestaurants();
  }, []);

  useEffect(() => {
    async function fetchInventoryItems() {
      try {
        const response = await axios.get('http://localhost:8000/api/inventory/');
        setInventoryItems(response.data);
      } catch (error) {
        setMessage('Error: Could not retrieve inventory items');
      }
    }
    fetchInventoryItems();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/warehouses/?item_name=${selectedInventoryItem.label}&quantity__gte=${quantity}&restaurant=${selectedRestaurant.value}`);
      setWarehouses(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Error: Could not retrieve warehouses');
    }
  }

  function renderOptions(options) {
    return options.map((option) => ({
      value: option.id,
      label: option.name,
    }));
  }

  function renderInventoryOptions(options) {
    return options.map((option) => ({
      value: option.id,
      label: option.item_name,
    }));
  }

  return (
    <div>
      <h1>Place Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="restaurant">Restaurant:</label>
          <Select
            id="restaurant"
            value={selectedRestaurant}
            options={renderOptions(restaurants)}
            onChange={(option) => setSelectedRestaurant(option)}
          />
        </div>
        <div>
          <label htmlFor="inventory-item">Inventory Item:</label>
          <Select
            id="inventory-item"
            value={selectedInventoryItem}
            options={renderInventoryOptions(inventoryItems)}
            onChange={(option) => setSelectedInventoryItem(option)}
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
        <button type="submit">Find Warehouses</button>
      </form>
      {message && <p>{message}</p>}
      {warehouses.length > 0 && (
        <div>
          <h2>Closest Warehouses:</h2>
          <ul>
            {warehouses.map((warehouse) => (
              <li key={warehouse.id}>
                {warehouse.name} ({warehouse.distance} km)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderForm;
