
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MiniDrawer from './components/drawer2';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  
  return (
    <>
    <Router>
      <MiniDrawer />
    </Router>
    </>
  )
}

export default App;
