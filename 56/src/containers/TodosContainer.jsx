import React from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoList } from '../components/TodoList';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination'; 
import { AddTodoForm } from '../components/AddTodoForm'; 

export const TodosContainer = () => {
  const {
    todos,
    isLoading,
    error,
    searchTerm,
    totalTodos,
    
    currentPage, totalPages, limitPerPage, isFirstPage, isLastPage,
    
    goToNextPage, goToPrevPage, setLimit, setSearchTerm,
    
    editTodoTitle,
    addTodo,
    deleteTodo,
    toggleCompletion, 
  } = useTodos(); 

  return (
    <div style={{ padding: '20px' }}>
      <h1>Список Справ ({totalTodos} всього)</h1>
      <p style={{ color: '#777', fontSize: '14px' }}>
        *Дані обробляються локально.
      </p>

      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Помилка: {error}</p>}
      
      <AddTodoForm onAdd={addTodo} /> 

      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      {isLoading ? (
        <p style={{ fontSize: '18px', color: '#007BFF' }}>Завантаження справ...</p>
      ) : (
        <>
          <TodoList 
            todos={todos} 
            onEditTitle={editTodoTitle} 
            onDelete={deleteTodo} 
            onToggleCompletion={toggleCompletion} 
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalTodos={totalTodos}
            limitPerPage={limitPerPage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
            onLimitChange={setLimit}
          />
        </>
      )}
    </div>
  );
};