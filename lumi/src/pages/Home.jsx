import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import api from '../services/api';
import { trackEvent } from '../services/tracking';

export default function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        trackEvent('PAGE_VIEW', { page: 'home' });

        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCategorySelect = (id) => {
        if (id === 'all') return;
        trackEvent('CATEGORY_CLICK', { categoryId: id });
        navigate(`/results?category=${id}`);
    };

    // Derived state for categories
    const clothing = products.filter(p => p.category === 'clothing');
    const cookies = products.filter(p => p.category === 'cookies');
    // Using 'clothing' as 'used' for now if specific category doesn't exist in DB
    const used = products.filter(p => p.category === 'used' || p.category === 'shoes').slice(0, 4);

    if (loading) {
        return <div className="p-8 text-center text-gray-500 animate-pulse">Chargement des produits...</div>;
    }

    return (
        <div className="animate-fade-in">
            {/* Category Pills */}
            <div className="mb-6 -mx-4">
                <CategoryFilter activeCategory="all" onSelectCategory={handleCategorySelect} />
            </div>

            {/* Clothing Section */}
            {clothing.length > 0 && (
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
            )}

            {/* Cookies Section */}
            {cookies.length > 0 && (
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
            )}

            {/* Used Section */}
            {used.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-medium mb-3">Articles d'occasion</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {used.map(p => (
                            <ProductCard key={p.id} product={p} type="grid" />
                        ))}
                    </div>
                </section>
            )}

            {products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">Aucun produit disponible pour le moment.</p>
                </div>
            )}
        </div>
    );
}
