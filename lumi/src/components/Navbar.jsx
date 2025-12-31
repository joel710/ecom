import { Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ onSearch }) {
    const { count, toggleCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 hidden md:block">
            <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <h1
                    onClick={() => navigate('/')}
                    className="text-3xl font-medium tracking-tight cursor-pointer mr-12 hover:scale-105 transition-transform"
                >
                    <span className="text-google-blue">L</span>
                    <span className="text-google-red">u</span>
                    <span className="text-google-yellow">m</span>
                    <span className="text-google-blue">i</span>
                    <span className="text-google-green">.</span>
                </h1>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8 mr-auto">
                    <button
                        onClick={() => navigate('/')}
                        className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-gray-900 border-b-2 border-google-blue pb-0.5' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Boutique
                    </button>
                    <button
                        onClick={() => navigate('/explore')}
                        className={`text-sm font-medium transition-colors ${isActive('/explore') ? 'text-gray-900 border-b-2 border-google-blue pb-0.5' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Explorer
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex-grow max-w-lg mx-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        onChange={(e) => onSearch && onSearch(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-google-blue/20 focus:border-google-blue transition-all sm:text-sm"
                        placeholder="Rechercher un produit, une catégorie..."
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <User className="w-6 h-6" />
                    </button>

                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ShoppingBag className="w-6 h-6" />
                        {count > 0 && (
                            <span className="absolute top-0 right-0 bg-google-red text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold animate-scale-in">
                                {count}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
