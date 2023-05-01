import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseItem = ({ warehouse, onUpdate, onDelete }) => {
  const [editable, setEditable] = useState(false);
  const [updatedWarehouse, setUpdatedWarehouse] = useState(warehouse);

  const handleUpdateWarehouse = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/warehouses/${updatedWarehouse.id}/`, updatedWarehouse);
      onUpdate();
      setEditable(false);
    } catch (error) {
      console.error('Error updating warehouse:', error);
    }
  };

  const handleDeleteWarehouse = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/warehouses/${warehouse.id}/`);
      onDelete();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  return (
    <li>
      {editable ? (
        <form onSubmit={handleUpdateWarehouse}>
          <input
            type="text"
            value={updatedWarehouse.name}
            onChange={(event) => setUpdatedWarehouse({ ...updatedWarehouse, name: event.target.value })}
          />
          <input
            type="number"
            value={updatedWarehouse.x_coordinate}
            onChange={(event) => setUpdatedWarehouse({ ...updatedWarehouse, x_coordinate: event.target.value })}
          />
          <input
            type="number"
            value={updatedWarehouse.y_coordinate}
            onChange={(event) => setUpdatedWarehouse({ ...updatedWarehouse, y_coordinate: event.target.value })}
          />
          <button type="submit">Save</button>
          <button onClick={() => setEditable(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <span>{warehouse.name} ({warehouse.x_coordinate}, {warehouse.y_coordinate})</span>
          <button onClick={() => setEditable(true)}>Edit</button>
          <button onClick={handleDeleteWarehouse}>Delete</button>
        </>
      )}
    </li>
  );
};

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', x_coordinate: '', y_coordinate: '' });

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/warehouses/');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleCreateWarehouse = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/warehouses/', newWarehouse);
      fetchWarehouses();
    } catch (error) {
      console.error('Error creating warehouse:', error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div>
      <h1>Warehouses</h1>
      <ul>
        {warehouses.map((warehouse) => (
          <WarehouseItem
            key={warehouse.id}
            warehouse={warehouse}
            onUpdate={fetchWarehouses}
            onDelete={fetchWarehouses}
          />
        ))}
      </ul>
      <h2>Create Warehouse</h2>
      <form onSubmit={handleCreateWarehouse}>
        <input
          type="text"
          placeholder="Name"
          value={newWarehouse.name}
          onChange={(event) => setNewWarehouse({ ...newWarehouse, name: event.target.value })}
        />
        <input
          type="number"
          placeholder="X Coordinate"
          value={newWarehouse.x_coordinate}
          onChange={(event) => setNewWarehouse({ ...newWarehouse, x_coordinate: event.target.value })}
        />
        <input
          type="number"
          placeholder="Y Coordinate"
          value={newWarehouse.y_coordinate}
          onChange={(event) => setNewWarehouse({ ...newWarehouse, y_coordinate: event.target.value })}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
