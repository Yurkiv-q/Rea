import React, { useState } from 'react';

export const TodoItem = ({ todo, onEditTitle, onDelete, onToggleCompletion }) => { 
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.todo);

  const handleSave = () => {
    if (!newTitle.trim()) return;
    onEditTitle(todo.id, newTitle); 
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(todo.todo);
    }
  };

  const handleEditClick = () => {
    setNewTitle(todo.todo); 
    setIsEditing(true);
  };
  
  const handleDeleteClick = () => {
      if (window.confirm(`Видалити справу "${todo.todo}" (ID: ${todo.id})?`)) {
          onDelete(todo.id);
      }
  };
  
  const handleToggle = () => {
      onToggleCompletion(todo.id);
  };

  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '10px 0', 
      borderBottom: '1px dotted #eee',
      backgroundColor: todo.completed ? '#f9fff9' : 'white'
    }}>
      
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isEditing} 
        style={{ marginRight: '10px', width: '20px', height: '20px', cursor: 'pointer' }}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flexGrow: 1, padding: '5px' }}
          disabled={todo.completed} 
        />
      ) : (
        <span 
          style={{ 
            flexGrow: 1, 
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#888' : '#333',
            cursor: 'pointer' 
          }}
          onClick={handleToggle} 
        >
          **ID:  {todo.todo}
        </span>
      )}

      <div style={{ marginLeft: '15px', display: 'flex', gap: '10px' }}>
        {isEditing ? (
          <button onClick={handleSave} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Зберегти
          </button>
        ) : (
          <button 
            onClick={handleEditClick} 
            disabled={todo.completed} 
            style={{ padding: '5px 10px', cursor: todo.completed ? 'not-allowed' : 'pointer' }}
          >
            Редагувати
          </button>
        )}
        <button
            onClick={handleDeleteClick} 
            disabled={isEditing}
            style={{ padding: '5px 10px', backgroundColor: '#DC3545', color: 'white', border: 'none', cursor: 'pointer', opacity: isEditing ? 0.5 : 1 }}
        >
            Видалити
        </button>
      </div>
    </li>
  );
};