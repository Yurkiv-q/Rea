import React from 'react';
import { TodosContainer } from './containers/TodosContainer'; 

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <TodosContainer />
    </div>
  );
}

export default App;