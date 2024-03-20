import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://20.244.56.144';

const AverageCalculator = () => {
  const [windowSize, setWindowSize] = useState(10);
  const [windowState, setWindowState] = useState([]);
  const [serverNumbers, setServerNumbers] = useState([]);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const fetchNumbers = async (numberId) => {
      try {
        const response = await axios.get(`${API_URL}/numbers/${numberId}`);
        return response.data.numbers;
      } catch (error) {
        console.error('Error fetching numbers:', error);
        return [];
      }
    };

    async function updateWindowState() {
      const newNumbers = await fetchNumbers('e');
      const updatedWindowState = [...windowState, ...newNumbers].slice(-windowSize);
      setWindowState(updatedWindowState);
      setServerNumbers(newNumbers);
      setAverage(
        updatedWindowState.reduce((sum, number) => sum + number, 0) / updatedWindowState.length
      );
    }

    updateWindowState();
  }, [windowSize]);

  return (
    <div className="p-4 bg-gray-200">
      <h1 className="text-2xl font-bold mb-2">Average Calculator</h1>
      <div className="mb-2">
        <label htmlFor="windowSize" className="mr-2">
          Window Size:
        </label>
        <input
          type="number"
          id="windowSize"
          value={windowSize}
          onChange={(e) => setWindowSize(parseInt(e.target.value, 10))}
          className="border p-1 rounded"
        />
      </div>
      <div className="mb-2">
        <p>
          Previous Window State: <span className="font-bold">{JSON.stringify(windowState.slice(0, -1))}</span>
        </p>
      </div>
      <div className="mb-2">
        <p>
          Current Window State: <span className="font-bold">{JSON.stringify(windowState.slice(-1))}</span>
        </p>
      </div>
      <div className="mb-2">
        <p>
          Numbers received from the server: <span className="font-bold">{JSON.stringify(serverNumbers)}</span>
        </p>
      </div>
      <div className="mb-2">
        <p>
          Average: <span className="font-bold">{average?.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default AverageCalculator;



