import React from 'react';
import NotePage from './pages/NotePage';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <main className="note-content">
        <NotePage />
      </main>
    </div>
  );
}

export default App;
