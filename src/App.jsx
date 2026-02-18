import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { getCurrentWeather, getHistoricalWeather, getMarineWeather } from './services/weatherService';

function App() {
  const [query, setQuery] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('current'); // 'current', 'historical', 'marine'

  // Replace this key with your own Weatherstack API key
  const [apiKey] = useState('8b9407fbb7c94c417b2682c3c3ee2b7b');

  const [historicalDate, setHistoricalDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      let data;
      if (mode === 'current') {
        data = await getCurrentWeather(query, apiKey);
      } else if (mode === 'historical') {
        data = await getHistoricalWeather(query, historicalDate, apiKey);
      } else if (mode === 'marine') {
        data = await getMarineWeather(query, apiKey);
      }

      if (data.error) {
        setError(data.error.info || 'An error occurred fetching weather data.');
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please check your network or API key.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, mode, historicalDate, apiKey]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Glass Weather</h1>

      {/* Mode Switcher */}
      <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <button
          className={`glass-button ${mode === 'current' ? 'active' : ''}`}
          onClick={() => setMode('current')}
          style={{ background: mode === 'current' ? 'rgba(255,255,255,0.4)' : undefined }}
        >
          Current
        </button>
        <button
          className={`glass-button ${mode === 'historical' ? 'active' : ''}`}
          onClick={() => setMode('historical')}
          style={{ background: mode === 'historical' ? 'rgba(255,255,255,0.4)' : undefined }}
        >
          Historical
        </button>
        <button
          className={`glass-button ${mode === 'marine' ? 'active' : ''}`}
          onClick={() => setMode('marine')}
          style={{ background: mode === 'marine' ? 'rgba(255,255,255,0.4)' : undefined }}
        >
          Marine
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {mode === 'historical' && (
        <div className="glass-panel" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label>Select Date:</label>
          <input
            type="date"
            className="glass-input"
            value={historicalDate}
            onChange={(e) => setHistoricalDate(e.target.value)}
            style={{ width: 'auto' }}
          />
        </div>
      )}

      {loading && <div className="glass-panel">Loading weather data...</div>}

      {error && (
        <div className="glass-panel" style={{ borderColor: 'rgba(255, 69, 58, 0.5)', background: 'rgba(255, 69, 58, 0.1)' }}>
          <p style={{ color: '#ffcccb' }}>{error}</p>
        </div>
      )}

      {!loading && !error && weatherData && (
        <WeatherDisplay data={weatherData} type={mode} />
      )}
    </div>
  );
}

export default App;
