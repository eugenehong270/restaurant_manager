import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css'
import Plot from 'react-plotly.js';

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

  const itemNames = Object.keys(items).map(sku => items[sku].itemName);
  const quantities = Object.keys(items).map(sku => items[sku].quantity);

  return (
    <div>
      <h1>Inventory</h1>
      <label htmlFor="warehouse-select">Select a warehouse:</label>
      <select id="warehouse-select" value={selectedWarehouse} onChange={handleWarehouseChange}>
        <option value="">All Warehouses</option>
        {warehouseOptions.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
        ))}
      </select>

      {/* <Plot
        data={[
          {
            type: 'bar',
            x: itemNames,
            y: quantities,
            width: 0.2, // specify the width of the bars
          }
        ]}
        layout={{ autosize: true, title: 'Inventory Quantity' }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      /> */}

      <Plot
        data={[
          {
            type: 'bar',
            x: itemNames,
            y: quantities,
            width: 0.2, // specify the width of the bars
            marker: {
              color: 'ffae00', // color of the bars
            },
          }
        ]}


        layout={{
          autosize: true,
          title: 'Inventory Quantity',
          margin: {
            l: 50, // left margin
            r: 50, // right margin
            t: 50, // top margin
            b: 50, // bottom margin
          },
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />




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
