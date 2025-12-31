import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import CartSidebar from './CartSidebar';
import { useCart } from '../context/CartContext';

export default function Layout() {
    const { isCartOpen } = useCart();
    const navigate = useNavigate();

    const handleSearch = (q) => {
        if (q.trim().length > 0) {
            navigate(`/results?q=${encodeURIComponent(q)}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans bg-gray-50/30">
            {/* Desktop Navigation */}
            <Navbar onSearch={handleSearch} />

            {/* Mobile Header */}
            <div className="md:hidden">
                <Header onSearch={handleSearch} />
            </div>

            <main className="pb-24 md:pb-8 md:pt-8 px-4 max-w-screen-xl mx-auto w-full">
                <Outlet />
            </main>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden">
                <BottomNav />
            </div>

            {isCartOpen && <CartSidebar />}
        </div>
    );
}

