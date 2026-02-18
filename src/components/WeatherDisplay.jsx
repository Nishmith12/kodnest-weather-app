import React from 'react';
import { Cloud, Wind, Droplets, Thermometer, MapPin, Calendar, Anchor } from 'lucide-react';

const WeatherDisplay = ({ data, type }) => {
    if (!data) return null;

    const { location, current, historical } = data;

    // Helper to standardise data access
    const isMarine = type === 'marine';
    const isHistorical = type === 'historical';

    // Basic current weather display
    if (type === 'current' && current) {
        return (
            <div className="glass-panel" style={{ textAlign: 'left', animation: 'fadeIn 0.5s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0' }}>
                            <MapPin size={24} /> {location.name}, {location.country}
                        </h2>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>{location.localtime}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <img src={current.weather_icons[0]} alt="Weather icon" style={{ borderRadius: '8px' }} />
                        <p style={{ margin: 0 }}>{current.weather_descriptions[0]}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '2rem 0' }}>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
                        {current.temperature}°C
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Wind size={20} /> <span>{current.wind_speed} km/h {current.wind_dir}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Droplets size={20} /> <span>{current.humidity}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Thermometer size={20} /> <span>Feels like {current.feelslike}°C</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Cloud size={20} /> <span>UV Index: {current.uv_index}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Historical Weather Display (simplified)
    if (isHistorical && historical) {
        const dateKey = Object.keys(historical)[0];
        const dayData = historical[dateKey];

        return (
            <div className="glass-panel" style={{ textAlign: 'left', marginTop: '1rem' }}>
                <h3><Calendar size={20} /> Historical Weather ({dateKey})</h3>
                <p>Max Temp: {dayData.maxtemp}°C</p>
                <p>Min Temp: {dayData.mintemp}°C</p>
                <p>Sunrise: {dayData.astro.sunrise}</p>
                <p>Sunset: {dayData.astro.sunset}</p>
                <div style={{ overflowX: 'auto', display: 'flex', gap: '1rem', paddingBottom: '1rem' }}>
                    {dayData.hourly.map((hour, idx) => (
                        <div key={idx} style={{ minWidth: '100px', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                            <p>{hour.time === '0' ? '00:00' : (hour.time.length <= 2 ? hour.time + ':00' : hour.time.slice(0, -2) + ':00')}</p>
                            <p>{hour.temperature}°C</p>
                            <p>{hour.weather_descriptions[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Marine Weather Display
    if (isMarine && data.data && data.data.weather) {
        // Note: Marine API structure might differ heavily, this is a best-guess placeholders based on common weatherstack patterns
        // Real Marine API response usually has `data.weather` array
        const marineData = data.data.weather[0];
        return (
            <div className="glass-panel" style={{ textAlign: 'left', marginTop: '1rem' }}>
                <h3><Anchor size={20} /> Marine Weather</h3>
                <p>Date: {marineData.date}</p>
                <p>Max Temp: {marineData.maxtemp}°C</p>
                <p>Min Temp: {marineData.mintemp}°C</p>
                <p>Sun Hours: {marineData.sunHour}</p>
                <div style={{ overflowX: 'auto', display: 'flex', gap: '1rem' }}>
                    {marineData.hourly.map((hour, idx) => (
                        <div key={idx} style={{ minWidth: '120px', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                            <p>{hour.time === '0' ? '00:00' : (hour.time.length <= 3 ? hour.time.slice(0, -2) + ':00' : hour.time)}</p>
                            <p>Temp: {hour.temperature}°C</p>
                            <p>Water: {hour.water_temp}°C</p>
                            <p>Swell: {hour.swellHeight_m}m</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Fallback or Unknown Data 
    return (
        <div className="glass-panel">
            <p>No weather data available for this category.</p>
        </div>
    );
};

export default WeatherDisplay;
