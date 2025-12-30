import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
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
        <div className="min-h-screen bg-white pb-24 font-sans">
            <Header onSearch={handleSearch} />
            <main className="mt-4 px-4">
                <Outlet />
            </main>
            <BottomNav />
            {isCartOpen && <CartSidebar />}
        </div>
    );
}
