import React, { useState, useEffect } from 'react';
import './App.css';

function getRandomColor() {
  const colors = ['#6f0ccc', '#230585', '#e01bda', '#340561',  '#c91042', '#59031a', '#d11717'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function Grid({ rows, cols }) {
  const [cells, setCells] = useState(
    Array.from({ length: rows * cols }, () => ({ active: false, fading: false }))
  );
  const [fadingColor, setFadingColor] = useState('#FFF');
  const [activeColor, setActiveColor] = useState('#333');

  useEffect(() => {
    function activateCell(index) {
      setCells(cells => {
        const newCells = [...cells];
        newCells[index] = { active: true, fading: true };
        return newCells;
      });
      setTimeout(() => {
        setCells(cells => {
          const newCells = [...cells];
          newCells[index] = { active: true, fading: false };
          return newCells;
        });
      }, 600);
      setTimeout(() => {
        setCells(cells => {
          const newCells = [...cells];
          newCells[index] = { active: false, fading: false };
          return newCells;
        });
      }, 600);
    }

    function randomColumn() {
      return Math.floor(Math.random() * cols);
    }

    function fall() {
      const col = randomColumn();
      let row = 0;

      function drop() {
        if (row < rows) {
          const index = row * cols + col;
          activateCell(index);
          row++;
          setTimeout(drop, 100); // Delay between cells in the same column
        }
      }
      drop();
    }

    const intervalId = setInterval(fall, 150);
    const colorChangeInterval = setInterval(() => {
      setActiveColor(getRandomColor());
      setFadingColor(getRandomColor());
    }, 2900);

    return () => {
      clearInterval(intervalId);
      clearInterval(colorChangeInterval);
    };
  }, [rows, cols]);

  useEffect(() => {
    setCells(Array.from({ length: rows * cols }, () => ({ active: false, fading: false })));
  }, [rows, cols]);

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${cols}, 20px)` }}>
      {cells.map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell.active ? 'active' : ''} ${cell.fading ? 'fading' : ''}`}
          style={{
            '--active-color': activeColor,
            '--fading-color': fadingColor,
          }}
        ></div>
      ))}
    </div>
  );
}

function App() {
    const [rows, setRows] = useState(15);
    const [cols, setCols] = useState(20);
  
    const updateGrid = (e) => {
      e.preventDefault();
      const newRows = parseInt(document.getElementById('rows-input').value, 10);
      const newCols = parseInt(document.getElementById('cols-input').value, 10);
      setRows(newRows);
      setCols(newCols);
    };
  
    return (
      <div className="App">
        <header className="header">
            <h1>Welcome to the Future of Gaming</h1>
            <h3>Prepare yourself for an epic journey</h3>
          <div className="input-container">
            <label>
              Rows:
              <input id="rows-input" type="number" defaultValue={rows} />
            </label>
            <label>
              Columns:
              <input id="cols-input" type="number" defaultValue={cols} />
            </label>
            <button onClick={updateGrid}>Update Grid</button>
          </div>
        </header>
        <div className="grid-container">
          <Grid rows={rows} cols={cols} />
        </div>
      </div>
    );
    
  }
  
  export default App;
