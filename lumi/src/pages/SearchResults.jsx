import { useSearchParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';

    let results = products;
    let title = 'Résultats';

    if (q) {
        results = products.filter(p =>
            p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.category.toLowerCase().includes(q.toLowerCase())
        );
        title = `Recherche : "${q}"`;
    } else if (category) {
        results = products.filter(p => p.category === category);
        const titles = { clothing: 'Vêtements', cookies: 'Biscuits', shoes: 'Chaussures', used: 'Occasions' };
        title = titles[category] || 'Catégorie';
    }

    return (
        <div className="animate-fade-in pb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-800">{title}</h2>
                <button onClick={() => navigate('/')} className="text-xs text-gray-400">Retour</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {results.length > 0 ? (
                    results.map(p => <ProductCard key={p.id} product={p} type="grid" />)
                ) : (
                    <p className="col-span-2 text-center text-gray-400 py-20 italic">Aucun article trouvé</p>
                )}
            </div>
        </div>
    );
}
