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
            onClick={handleProductClick}
            className={`
                group bg-white rounded-[24px] overflow-hidden border border-gray-100/50 
                hover:shadow-xl hover:border-google-blue/20 transition-all duration-300 cursor-pointer
                ${isCarousel ? 'min-w-[160px] md:min-w-[200px]' : 'w-full'}
            `}
        >
            <div className="relative aspect-square bg-gray-50 flex items-center justify-center text-5xl overflow-hidden">
                {product.imageUrl && product.imageUrl.startsWith('http') ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <span className="group-hover:scale-125 transition-transform duration-500">
                        {product.imageUrl || product.img || '📦'}
                    </span>
                )}

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-gray-800 hover:bg-google-blue hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="p-3 md:p-4">
                <h3 className="text-xs md:text-sm font-medium text-gray-800 truncate mb-1">
                    {product.name}
                </h3>
                <p className="text-sm md:text-base font-bold text-google-blue">
                    {product.price.toLocaleString('fr-FR')} FCFA
                </p>
            </div>
        </div>
    );
}
