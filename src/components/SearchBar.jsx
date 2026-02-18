import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            <input
                type="text"
                className="glass-input"
                placeholder="Enter location (e.g., New York, London)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="glass-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={20} />
            </button>
        </form>
    );
};

export default SearchBar;
