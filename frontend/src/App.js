import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Item from "./pages/Item"
import ItemList from './pages/ItemList';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Item/>} />
        <Route exact path="/list" element={<ItemList/>} />
      </Routes>
    </Router>
  );
}

export default App;
