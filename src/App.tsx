import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import CustomNavbar from './components/Menu/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
