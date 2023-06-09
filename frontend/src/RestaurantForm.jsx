import { useState } from 'react';
import axios from 'axios';
import './form.css';

function RestaurantForm() {
  const [name, setName] = useState('');
  const [xCoordinate, setXCoordinate] = useState('');
  const [yCoordinate, setYCoordinate] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/restaurants/', {
        name,
        x_coordinate: xCoordinate,
        y_coordinate: yCoordinate,
      });
      setMessage('Restaurant created successfully!');
      setName('');
      setXCoordinate('');
      setYCoordinate('');
    } catch (error) {
      setMessage('Error: Could not create restaurant');
    }
  }

  return (
    <div>
      <h1>Create Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="x-coordinate">X Coordinate:</label>
          <input
            type="number"
            id="x-coordinate"
            value={xCoordinate}
            onChange={(event) => setXCoordinate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="y-coordinate">Y Coordinate:</label>
          <input
            type="number"
            id="y-coordinate"
            value={yCoordinate}
            onChange={(event) => setYCoordinate(event.target.value)}
          />
        </div>
        <button type="submit">Create Restaurant</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RestaurantForm;
