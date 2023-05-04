// App.js
import React from 'react';
import XYPlane from './xyplane';
import './mainpage.css';

const Legend = ({ warehouses, restaurants }) => (
  <div className="map-legend">
    <h2>Legend</h2>
    <h3>Warehouses</h3>
    <ul>
      {warehouses.map((warehouse, index) => (
        <li key={warehouse.id}>
          {index + 1}. {warehouse.name}
        </li>
      ))}
    </ul>
    <h3>Restaurants</h3>
    <ul>
      {restaurants.map((restaurant, index) => (
        <li key={restaurant.id}>
          {index + 1}. {restaurant.name}
        </li>
      ))}
    </ul>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      warehouses: [],
      restaurants: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const [warehousesResponse, restaurantsResponse] = await Promise.all([
        fetch('http://localhost:8000/api/warehouses/'),
        fetch('http://localhost:8000/api/restaurants/'),
      ]);

      const [warehousesData, restaurantsData] = await Promise.all([
        warehousesResponse.json(),
        restaurantsResponse.json(),
      ]);

      const warehousePoints = warehousesData.map((warehouse, index) => [
        warehouse.x_coordinate,
        warehouse.y_coordinate,
        index + 1,
        'warehouse',
      ]);

      const restaurantPoints = restaurantsData.map((restaurant, index) => [
        restaurant.x_coordinate,
        restaurant.y_coordinate,
        index + 1,
        'restaurant',
      ]);

      this.setState({
        points: [...warehousePoints, ...restaurantPoints],
        warehouses: warehousesData,
        restaurants: restaurantsData,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  render() {
    const { points, warehouses, restaurants } = this.state;

    return (
      <div className="map-legend-container">
        <Legend warehouses={warehouses} restaurants={restaurants} />
        <div className="xy-plane-container">
          <h1>Map</h1>
          <XYPlane points={points} />
        </div>
      </div>
    );
  }
}

export default App;
