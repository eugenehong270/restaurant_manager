import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderForm() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [closestWarehouses, setClosestWarehouses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/api/restaurants/');
      setRestaurants(response.data);
    }
    fetchData();
  }, []);

  async function fetchInventory() {
    const response = await axios.get('http://localhost:8000/api/inventory/');
    const inventory = response.data;
    const inventoryGrouped = {};
    inventory.forEach(item => {
      if (inventoryGrouped[item.sku]) {
        inventoryGrouped[item.sku].quantity += item.quantity;
      } else {
        inventoryGrouped[item.sku] = {
          ...item,
        };
      }
    });
    const inventoryList = Object.values(inventoryGrouped);
    setInventory(inventoryList);
  }


  useEffect(() => {
    fetchInventory();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const warehousesResponse = await axios.get('http://localhost:8000/api/warehouses/');
      const warehouseIds = warehousesResponse.data.map(warehouse => warehouse.id);

      const closestWarehouses = [];
      for (let i = 0; i < warehouseIds.length; i++) {
        const inventoryResponse = await axios.get(`http://localhost:8000/api/inventory/?warehouse=${warehouseIds[i]}`);
        const chosenItemInventory = inventoryResponse.data.filter(item => item.sku === selectedItem && item.quantity >= quantity);
        if (chosenItemInventory.length > 0) {
          const warehouseResponse = await axios.get(`http://localhost:8000/api/warehouses/${warehouseIds[i]}/`);
          closestWarehouses.push({
            ...warehouseResponse.data,
            quantity: chosenItemInventory[0].quantity,
            sku: chosenItemInventory[0].sku,
            item_name: chosenItemInventory[0].item_name,
          });
        }
      }
      setClosestWarehouses(closestWarehouses);
    } catch (error) {
      console.error(error);
    }
  }

  function handleRestaurantChange(event) {
    setSelectedRestaurant(event.target.value);
  }

  function handleItemChange(event) {
    setSelectedItem(event.target.value);
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  return (
    <div>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="restaurant">Restaurant:</label>
          <select id="restaurant" value={selectedRestaurant} onChange={handleRestaurantChange}>
            <option value="">Select a restaurant</option>
            {restaurants.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="item">Item:</label>
          <select id="item" value={selectedItem} onChange={handleItemChange}>
  <option value="">Select an item</option>
  {inventory.map(item => (
    <option key={item.sku} value={item.sku}>
      SKU: {item.sku} - {item.item_name}
    </option>
  ))}
</select>

        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {closestWarehouses.length > 0 && (
  <div>
    <h2>Closest Warehouses:</h2>
    <ul>
      {closestWarehouses.map(warehouse => (
        <li key={warehouse.id}>
          {warehouse.name} - Quantity: {warehouse.quantity}, SKU: {warehouse.sku}, Item Name: {warehouse.item_name}
        </li>
      ))}
    </ul>
  </div>
)}

</div>
  );
}
export default OrderForm
