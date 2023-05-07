import React, { useState, useEffect } from 'react';

function WarehouseSQL() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function fetchWarehouses() {
      const response = await fetch('http://localhost:8000/api/warehousesSQL/');
      const data = await response.json();
      setWarehouses(data.warehouses);
    }
    fetchWarehouses();
  }, []);

  return (
    <div>
      <h1>Warehouses</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WarehouseSQL;
