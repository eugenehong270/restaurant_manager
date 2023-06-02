import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function InventoryData() {
  const [data, setData] = useState([]);
  const [viewOption, setViewOption] = useState('quantity');  // add state for view option

  useEffect(() => {
    async function fetchInventoryData() {
      const response = await axios.get('http://localhost:8000/api/inventory/');
      setData(response.data);
    }

    fetchInventoryData();
  }, []);

  // Group by SKU
  const groupedData = data.reduce((acc, item) => {
    acc[item.sku] = acc[item.sku] || [];
    acc[item.sku].push(item);
    return acc;
  }, {});

  // Generate plot data for each SKU
  const plotData = Object.values(groupedData).map(items => {
    // Sort items by date
    items.sort((a, b) => new Date(a.date) - new Date(b.date));

    let y;
    if (viewOption === 'quantity') {
      y = items.map(item => item.quantity);
    } else if (viewOption === 'percentage') {
      // Calculate percentage change
      y = items.map((item, i) => {
        if (i === 0) return 0;  // no change for the first item
        const previousItem = items[i - 1];
        const change = (item.quantity - previousItem.quantity) / previousItem.quantity * 100;
        return change;
      });
    }

    return {
        x: items.map(item => item.date),
        y,
        type: 'scatter',
        mode: 'lines+points',
        name: items[0].item_name,  // use item name instead of SKU
      };
  });

  const layout = {
    title: 'Inventory Orders Over Time by SKU',
    xaxis: {
      title: 'Date',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: viewOption === 'quantity' ? 'Quantity' : 'Percentage Change',
      showline: false
    }
  };

  return (
    <div>
      <label>
        View:
        <select value={viewOption} onChange={event => setViewOption(event.target.value)}>
          <option value="quantity">Quantity</option>
          <option value="percentage">Percentage Change</option>
        </select>
      </label>
      <Plot
  data={plotData}
  layout={{...layout, autosize: true}}
  style={{ width: "100%", height: "100%" }}
  useResizeHandler={true}
/>


    </div>
  );
}

export default InventoryData;
