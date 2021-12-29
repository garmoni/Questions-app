import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Answer from './components/Answer';
import Questions from './components/Questions';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/answer" element={<Answer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
