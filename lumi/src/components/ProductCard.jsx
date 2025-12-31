import { useCart } from '../context/CartContext';
import { useProductModal } from '../context/ProductModalContext';
import { Plus } from 'lucide-react';
import { trackEvent } from '../services/tracking';

export default function ProductCard({ product, type = 'grid' }) {
    const { addToCart } = useCart();
    const { openModal } = useProductModal();
    const isCarousel = type === 'carousel';

    const handleProductClick = () => {
        trackEvent('PRODUCT_CLICK', { productId: product.id, name: product.name });
        openModal(product);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        trackEvent('ADD_TO_CART', { productId: product.id, name: product.name, price: product.price });
    };

    return (
        <div
            className={`group relative cursor-pointer ${isCarousel ? 'flex-none w-[150px]' : 'w-full'}`}
            onClick={handleProductClick}
        >
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-4xl hover:bg-gray-200 transition-colors relative overflow-hidden">
                {product.imageUrl && product.imageUrl.startsWith('http') ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <span>{product.img || '📦'}</span>
                )}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
                >
                    <Plus className="w-4 h-4 text-google-blue" strokeWidth={3} />
                </button>
            </div>
            <div className="mt-2 px-1">
                <h3 className="text-sm font-normal text-gray-800 truncate">{product.name}</h3>
                <p className="text-xs font-bold text-gray-900 mt-0.5">
                    {product.price.toLocaleString('fr-FR')} FCFA
                </p>
            </div>
        </div>
    );
}

