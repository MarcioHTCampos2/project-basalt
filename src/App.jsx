import React from 'react';
import Sidebar from './components/Sidebar';
import NotePage from './pages/NotePage';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <NotePage />
      </div>
    </div>
  );
}

export default App;
