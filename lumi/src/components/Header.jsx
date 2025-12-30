import { Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ onSearch }) {
    const { count, toggleCart } = useCart();
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 bg-white z-50 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h1
                    onClick={() => navigate('/')}
                    className="text-2xl font-medium tracking-tight cursor-pointer"
                >
                    <span className="text-google-blue">L</span>
                    <span className="text-google-red">u</span>
                    <span className="text-google-yellow">m</span>
                    <span className="text-google-blue">i</span>
                    <span className="text-google-green">.</span>
                </h1>
                <button
                    onClick={toggleCart}
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ShoppingBag className="w-6 h-6 text-gray-800" />
                    {count > 0 && (
                        <span className="absolute top-0 right-0 bg-google-red text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                            {count}
                        </span>
                    )}
                </button>
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2 border border-gray-100 shadow-sm focus-within:shadow-md transition-shadow">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                    type="text"
                    onChange={(e) => onSearch && onSearch(e.target.value)}
                    placeholder="Rechercher des articles..."
                    className="w-full outline-none text-sm py-1 placeholder-gray-400"
                />
            </div>
        </header>
    );
}
