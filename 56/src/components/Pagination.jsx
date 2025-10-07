import React from 'react';

export const Pagination = ({
  currentPage,
  totalPages,
  totalTodos,
  limitPerPage,
  isFirstPage,
  isLastPage,
  goToPrevPage,
  goToNextPage,
  onLimitChange
}) => {
  const startItem = (limitPerPage * (currentPage - 1)) + 1;
  const endItem = Math.min(limitPerPage * currentPage, totalTodos);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginTop: '20px', 
      borderTop: '1px solid #eee', 
      paddingTop: '10px' 
    }}>
      
      <div style={{ fontSize: '14px', color: '#555' }}>
        Показано **{startItem} - {endItem}** з **{totalTodos}** справ. 
        (Сторінка **{currentPage}** з **{totalPages}**)
      </div>

      <div>
        <select 
          value={limitPerPage} 
          onChange={(e) => onLimitChange(Number(e.target.value))}
          style={{ padding: '5px', marginRight: '10px' }}
        >
          <option value={5}>5 на сторінці</option>
          <option value={10}>10 на сторінці</option>
          <option value={20}>20 на сторінці</option>
        </select>

        <button 
          onClick={goToPrevPage} 
          disabled={isFirstPage}
          style={{ padding: '8px 15px', marginRight: '10px', cursor: isFirstPage ? 'not-allowed' : 'pointer' }}
        >
          Попередня
        </button>

        <button 
          onClick={goToNextPage} 
          disabled={isLastPage}
          style={{ padding: '8px 15px', cursor: isLastPage ? 'not-allowed' : 'pointer' }}
        >
          Наступна
        </button>
      </div>
    </div>
  );
};