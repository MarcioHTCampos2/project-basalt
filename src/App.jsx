// src/App.jsx
import Sidebar from './components/Sidebar';
import NotePage from './pages/NotePage';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="note-content">
        <NotePage />
      </main>
    </div>
  );
}

export default App;
