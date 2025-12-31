import { X, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buyNowViaWhatsApp } from '../services/whatsapp';
import { trackEvent } from '../services/tracking';

export default function ProductDetailModal({ product, onClose }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        trackEvent('ADD_TO_CART_MODAL', { productId: product.id, name: product.name });
        onClose();
    };

    const handleBuyNow = () => {
        trackEvent('BUY_NOW', { productId: product.id, name: product.name });
        buyNowViaWhatsApp(product);
    };

    return (
        <div className="fixed inset-0 z-[70] flex justify-end flex-col md:justify-center md:items-center p-0 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full md:max-w-4xl md:rounded-[32px] rounded-t-[32px] p-6 shadow-2xl animate-slide-up md:animate-scale-in max-h-[85vh] overflow-y-auto md:flex md:gap-8 md:overflow-visible">

                {/* Close Button Desktop */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 bg-white/20 text-white hover:bg-white/30 rounded-full transition-colors hidden md:block"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Drag Handle (Mobile Only) */}
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 md:hidden" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors md:hidden"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 aspect-square bg-gray-50 rounded-3xl flex items-center justify-center text-8xl shadow-inner overflow-hidden mb-6 md:mb-0">
                    {product.imageUrl && product.imageUrl.startsWith('http') ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <span>{product.imageUrl || product.img || '📦'}</span>
                    )}
                </div>

                {/* Info Section */}
                <div className="flex flex-col md:w-1/2 md:justify-center">
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-2 md:flex-col md:gap-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h2>
                            <span className="text-xl md:text-2xl font-bold text-google-blue whitespace-nowrap">
                                {product.price.toLocaleString('fr-FR')} FCFA
                            </span>
                        </div>
                        <p className="text-gray-500 leading-relaxed md:text-lg">
                            {product.description || "Aucune description disponible pour ce produit."}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-auto pb-4 safe-area-pb md:pb-0">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-gray-200"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Ajouter
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-[2] bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 active:scale-95 transition-all hover:bg-[#128C7E]"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Acheter maintenant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
