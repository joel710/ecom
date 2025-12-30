export default function CategoryFilter({ activeCategory, onSelectCategory }) {
    const categories = [
        { id: 'all', label: 'Pour vous' },
        { id: 'clothing', label: 'Vêtements' },
        { id: 'cookies', label: 'Biscuits' },
        { id: 'shoes', label: 'Chaussures' },
        { id: 'used', label: 'Occasions' },
    ];

    return (
        <div className="flex overflow-x-auto no-scrollbar px-4 py-2 space-x-2">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${activeCategory === cat.id
                            ? 'bg-[#e8f0fe] text-google-blue border-google-blue'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
