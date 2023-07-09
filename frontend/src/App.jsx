import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/home/home.jsx';

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
