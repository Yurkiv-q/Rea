import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, onEditTitle, onDelete, onToggleCompletion }) => { 
  if (todos.length === 0) {
    return <p style={{ color: '#888', fontStyle: 'italic' }}>Не знайдено справ для поточної сторінки/пошуку.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          
          todo={todo} 
          onEditTitle={onEditTitle} 
          onDelete={onDelete} 
          onToggleCompletion={onToggleCompletion} 
        />
      ))}
    </ul>
  );
};