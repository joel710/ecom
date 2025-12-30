import { useNavigate } from 'react-router-dom';

export default function Explore() {
    const navigate = useNavigate();

    const handleCategory = (cat) => navigate(`/results?category=${cat}`);

    return (
        <div className="animate-fade-in pb-8">
            <h2 className="text-xl font-medium mb-6">Explorer les rayons</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div onClick={() => handleCategory('clothing')} className="aspect-square rounded-[20px] bg-blue-50 text-blue-700 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
                    <span className="text-4xl mb-2">👕</span>
                    <span className="font-medium">Mode</span>
                </div>
                <div onClick={() => handleCategory('cookies')} className="aspect-square rounded-[20px] bg-orange-50 text-orange-700 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
                    <span className="text-4xl mb-2">🍪</span>
                    <span className="font-medium">Épicerie</span>
                </div>
                <div onClick={() => handleCategory('shoes')} className="aspect-square rounded-[20px] bg-green-50 text-green-700 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
                    <span className="text-4xl mb-2">👟</span>
                    <span className="font-medium">Souliers</span>
                </div>
                <div onClick={() => handleCategory('used')} className="aspect-square rounded-[20px] bg-purple-50 text-purple-700 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
                    <span className="text-4xl mb-2">♻️</span>
                    <span className="font-medium">Seconde main</span>
                </div>
            </div>

            <h2 className="text-lg font-medium mb-4">Pour vous inspirer</h2>
            <div className="bg-gray-100 rounded-3xl p-6 mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Collection Été</h3>
                    <p className="text-sm text-gray-500 mb-4">Préparez-vous pour le soleil</p>
                    <button onClick={() => handleCategory('clothing')} className="bg-white px-4 py-2 rounded-full text-xs font-bold shadow-sm">Découvrir</button>
                </div>
                <span className="absolute -right-4 -bottom-4 text-8xl opacity-20 select-none">☀️</span>
            </div>
        </div>
    );
}
