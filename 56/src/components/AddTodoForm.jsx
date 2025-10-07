import React, { useState } from 'react';

export const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle); 
      setTitle(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', border: '1px solid #ddd', padding: '10px', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <input
        type="text"
        placeholder="Введіть назву нової справи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flexGrow: 1, padding: '10px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        required
      />
      <button 
        type="submit" 
        style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Додати Справу
      </button>
    </form>
  );
};