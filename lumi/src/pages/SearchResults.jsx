import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { trackEvent } from '../services/tracking';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                let endpoint = '/products';
                const params = new URLSearchParams();
                if (q) params.append('search', q);
                if (category) params.append('category', category);

                const response = await api.get(`${endpoint}?${params.toString()}`);
                setProducts(response.data);

                trackEvent('SEARCH', { query: q, category, resultCount: response.data.length });
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [q, category]);

    let title = 'Résultats';
    if (q) title = `Recherche : "${q}"`;
    else if (category) {
        const titles = { clothing: 'Vêtements', cookies: 'Biscuits', shoes: 'Chaussures', used: 'Occasions' };
        title = titles[category] || 'Catégorie';
    }

    return (
        <div className="animate-fade-in pb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-800">{title}</h2>
                <button onClick={() => navigate('/')} className="text-xs text-gray-400">Retour</button>
            </div>

            {loading ? (
                <div className="text-center py-20 animate-pulse text-gray-400">Recherche en cours...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.length > 0 ? (
                        products.map(p => <ProductCard key={p.id} product={p} type="grid" />)
                    ) : (
                        <p className="col-span-full text-center text-gray-400 py-20 italic">Aucun article trouvé</p>
                    )}
                </div>
            )}
        </div>
    );
}

