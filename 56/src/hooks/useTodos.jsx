import { useState, useEffect, useCallback, useMemo } from 'react';

const generateMockTodos = (count = 150) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    todo: `Локальна справа №${i + 1}: Приготувати звіт для відділу ${String.fromCharCode(65 + (i % 5))}`,
    completed: i % 7 === 0,
    userId: 1,
  }));
};

const INITIAL_LOCAL_TODOS = generateMockTodos();
const DEFAULT_LIMIT = 10;


export function useTodos() {
  const [fullCollection, setFullCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(DEFAULT_LIMIT);
  

  useEffect(() => {
    setTimeout(() => {
      setFullCollection(INITIAL_LOCAL_TODOS);
      setIsLoading(false);
    }, 500); 
  }, []);

  const searchedTodos = useMemo(() => {
    if (!searchTerm) return fullCollection;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return fullCollection.filter(todo => 
      todo.todo.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [fullCollection, searchTerm]);

  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * limitPerPage;
    const end = start + limitPerPage;
    return searchedTodos.slice(start, end);
  }, [searchedTodos, currentPage, limitPerPage]);
  
  const totalPages = useMemo(() => 
    Math.ceil(searchedTodos.length / limitPerPage)
  , [searchedTodos.length, limitPerPage]);


  const editTodoTitle = useCallback((id, newTitle) => {
    if (!newTitle.trim()) return;

    setFullCollection(currentCollection => 
      currentCollection.map(todo => 
        todo.id === id 
          ? { ...todo, todo: newTitle } 
          : todo
      )
    );
  }, []);
    
  const addTodo = useCallback((title) => {
    if (!title.trim()) return;
    
    const newTodo = { 
      id: Date.now(), 
      todo: title, 
      completed: false, 
      userId: 1 
    };
    
    setFullCollection(currentCollection => [newTodo, ...currentCollection]);
    setCurrentPage(1); 
    setSearchTerm(''); 
  }, []);

  const deleteTodo = useCallback((id) => {
    
    setFullCollection(currentCollection => 
      currentCollection.filter(todo => todo.id !== id)
    );
    
    if (paginatedTodos.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
    }
  }, [paginatedTodos.length, currentPage]);

  const toggleCompletion = useCallback((id) => {
    setFullCollection(currentCollection => 
      currentCollection.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }, []);


  const goToNextPage = useCallback(() => setCurrentPage(prev => Math.min(prev + 1, totalPages)), [totalPages]);
  const goToPrevPage = useCallback(() => setCurrentPage(prev => Math.max(prev - 1, 1)), []);
  const setLimit = useCallback((limit) => { setLimitPerPage(limit); setCurrentPage(1); }, []);


  return {
    todos: paginatedTodos, 
    isLoading,
    totalTodos: searchedTodos.length,
    
    currentPage, limitPerPage, totalPages,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage >= totalPages, 
    
    searchTerm, setSearchTerm,
    goToNextPage, goToPrevPage, setLimit,
    
    editTodoTitle, addTodo, deleteTodo,
    toggleCompletion, 
  };
}