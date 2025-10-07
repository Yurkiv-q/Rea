import React from 'react';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Пошук справ за назвою (лише на поточній сторінці)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: '8px', width: '350px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </div>
  );
};