import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Home, LogOut, LogIn, User } from 'lucide-react';

export default function Navbar({ user, cartCount, onLogout }) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/cart');
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vibe Commerce
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            {user && (
              <Link to="/create-product" className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </Link>
            )}

            <button
              onClick={handleCartClick}
              className="relative flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-lg hover:bg-gray-100"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <button onClick={onLogout} className="p-2 rounded-lg hover:bg-gray-100">
                <LogOut className="w-6 h-6 text-red-600" />
              </button>
            ) : (
              <Link to="/auth" className="p-2 rounded-lg hover:bg-gray-100">
                <LogIn className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}