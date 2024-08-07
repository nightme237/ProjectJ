
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendar from './Calendar';

function App() {
  return (
    <BrowserRouter basename='/ProjectJ/'>
      <Routes>
        <Route path="/" element={<Calendar/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
