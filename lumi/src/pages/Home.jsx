import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
    const navigate = useNavigate();

    const handleCategorySelect = (id) => {
        if (id === 'all') return; // Already here
        navigate(`/results?category=${id}`);
    };

    const clothing = products.filter(p => p.category === 'clothing');
    const cookies = products.filter(p => p.category === 'cookies');
    const used = products.filter(p => p.category === 'used').slice(0, 4);

    return (
        <div className="animate-fade-in">
            {/* Category Pills */}
            <div className="mb-6 -mx-4">
                <CategoryFilter activeCategory="all" onSelectCategory={handleCategorySelect} />
            </div>

            {/* Clothing Section */}
            <section className="mb-8 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-medium">Vêtements tendances</h2>
                    <button
                        onClick={() => handleCategorySelect('clothing')}
                        className="text-xs text-google-blue font-medium"
                    >
                        Voir tout
                    </button>
                </div>
                <div className="flex overflow-x-auto no-scrollbar space-x-4 pb-2">
                    {clothing.map(p => (
                        <ProductCard key={p.id} product={p} type="carousel" />
                    ))}
                </div>
            </section>

            {/* Cookies Section */}
            <section className="mb-8 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-medium">Biscuits & Délices</h2>
                    <button
                        onClick={() => handleCategorySelect('cookies')}
                        className="text-xs text-google-blue font-medium"
                    >
                        Voir tout
                    </button>
                </div>
                <div className="flex overflow-x-auto no-scrollbar space-x-4 pb-2">
                    {cookies.map(p => (
                        <ProductCard key={p.id} product={p} type="carousel" />
                    ))}
                </div>
            </section>

            {/* Used Section */}
            <section className="mb-8">
                <h2 className="text-lg font-medium mb-3">Articles d'occasion</h2>
                <div className="grid grid-cols-2 gap-4">
                    {used.map(p => (
                        <ProductCard key={p.id} product={p} type="grid" />
                    ))}
                </div>
            </section>
        </div>
    );
}
