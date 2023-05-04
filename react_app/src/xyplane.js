import React from 'react';

class XYPlane extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawPoints();
  }

  componentDidUpdate() {
    this.drawPoints();
  }


  drawPoints() {
    const { points } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const [minX, maxX, minY, maxY] = points.reduce(
      ([minX, maxX, minY, maxY], [x, y]) => [
        Math.min(minX, x),
        Math.max(maxX, x),
        Math.min(minY, y),
        Math.max(maxY, y),
      ],
      [Infinity, -Infinity, Infinity, -Infinity]
    );

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const scaleX = (width - 2 * padding) / (maxX - minX);
    const scaleY = (height - 2 * padding) / (maxY - minY);

    points.forEach(([x, y, number, type]) => {
      const normalizedX = (x - minX) * scaleX + padding;
      const normalizedY = (y - minY) * scaleY + padding;

      if (type === 'warehouse') {
        ctx.beginPath();
        ctx.arc(normalizedX, normalizedY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
      } else if (type === 'restaurant') {
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.moveTo(normalizedX - 3, normalizedY - 3);
        ctx.lineTo(normalizedX + 3, normalizedY + 3);
        ctx.moveTo(normalizedX + 3, normalizedY - 3);
        ctx.lineTo(normalizedX - 3, normalizedY + 3);
        ctx.stroke();
        ctx.closePath();
      }

      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(number, normalizedX + 5, normalizedY + 3);
    });
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width="500"
        height="500"
        style={{
          border: '1px solid black',
          display: 'block',
          margin: '0 auto',
        }}
      />
    );
  }
}

export default XYPlane;
