import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
    const { cart, removeFromCart, toggleCart, total } = useCart();

    return (
        <div className="fixed inset-0 z-[60]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col animate-slide-left">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Votre Panier</h2>
                    <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto space-y-6 no-scrollbar">
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center mt-20 italic">Votre panier est vide</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex items-center space-x-4 animate-fade-in">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                                    {item.img}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-medium">{item.name}</h4>
                                    <p className="text-sm font-bold text-google-blue">{item.price.toFixed(2)} €</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t pt-6 mt-4">
                    <div className="flex justify-between mb-6">
                        <span className="text-gray-500">Total estimé</span>
                        <span className="font-bold text-xl">{total.toFixed(2)} €</span>
                    </div>
                    <button className="w-full bg-google-blue text-white py-4 rounded-full font-medium shadow-lg active:scale-95 transition-all">
                        Finaliser la commande
                    </button>
                </div>
            </div>
        </div>
    );
}
