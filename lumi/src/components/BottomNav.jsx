import { Home, Compass, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-50">
            <button
                onClick={() => navigate('/')}
                className={`flex flex-col items-center ${isActive('/') ? 'text-google-blue' : 'text-gray-400'}`}
            >
                <Home className="w-6 h-6" />
                <span className="text-[10px] mt-1 font-medium">Boutique</span>
            </button>
            <button
                onClick={() => navigate('/explore')}
                className={`flex flex-col items-center ${isActive('/explore') ? 'text-google-blue' : 'text-gray-400'}`}
            >
                <Compass className="w-6 h-6" />
                <span className="text-[10px] mt-1 font-medium">Explorer</span>
            </button>
            <button
                className="flex flex-col items-center text-gray-400"
            >
                <User className="w-6 h-6" />
                <span className="text-[10px] mt-1 font-medium">Compte</span>
            </button>
        </nav>
    );
}
