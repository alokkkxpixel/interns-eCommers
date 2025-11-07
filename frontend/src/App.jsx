import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';
import Cart from './pages/Cart';
import Auth from './pages/Auth';


// Axios interceptor for auth
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("cart data ",data)
      setCartCount(data.items.length);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      fetchCartCount();
    }
  }, []);

  // const token = localStorage.getItem("token")

  const handleAuth = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    fetchCartCount();
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCartCount(0);
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} onCartUpdate={fetchCartCount} />} />
        <Route path="/create-product" element={<CreateProduct user={user} />} />
        <Route path="/cart" element={<Cart user={user} onCartUpdate={fetchCartCount} />} />
        <Route path="/auth" element={<Auth onAuth={handleAuth} />} />
      </Routes>
    </div>
  );
}

export default App;