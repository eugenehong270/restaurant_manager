import { useState, useEffect } from 'react';
import axios from 'axios';

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      const response = await axios.get(
        'http://localhost:8000/api/restaurants/'
      );
      setRestaurants(response.data);
    }
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>X Coordinate</th>
            <th>Y Coordinate</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.x_coordinate}</td>
              <td>{restaurant.y_coordinate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Restaurant;
