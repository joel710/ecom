import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

export default function ProductCard({ product, type = 'grid' }) {
    const { addToCart } = useCart();
    const isCarousel = type === 'carousel';

    return (
        <div
            className={`group relative cursor-pointer ${isCarousel ? 'flex-none w-[150px]' : 'w-full'}`}
            onClick={() => addToCart(product)}
        >
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-4xl hover:bg-gray-200 transition-colors relative overflow-hidden">
                {product.img}
                <div className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-4 h-4 text-google-blue" strokeWidth={3} />
                </div>
            </div>
            <div className="mt-2 px-1">
                <h3 className="text-sm font-normal text-gray-800 truncate">{product.name}</h3>
                <p className="text-xs font-bold text-gray-900 mt-0.5">{product.price.toFixed(2)} €</p>
            </div>
        </div>
    );
}
