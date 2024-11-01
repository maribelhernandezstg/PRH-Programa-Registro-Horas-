import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import CustomNavbar from './components/Menu/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarWrapper />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

function NavbarWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return <>{!isLoginPage && <CustomNavbar />}</>;
}

export default App;
