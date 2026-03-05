import React, { useState } from 'react';
import { Bell, Search, Plus, MoreVertical, Pencil, AlertTriangle } from 'lucide-react';

const CATEGORIES = ['Dania Główne', 'Przystawki', 'Desery', 'Napoje'];

const MENU_ITEMS = [
    {
        id: 1,
        name: 'Burger Klasyk 100% Wołowina',
        desc: 'Soczysta wołowina (200g), sałata, pomidor, czerwona cebula, sos...',
        price: '38,00 zł',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200&h=200',
        available: true,
        tags: ['2 warianty', '⚠️ Alergeny'],
    },
    {
        id: 2,
        name: 'Burger Vege Beyond',
        desc: 'Kotlet Beyond Meat, wegański majonez, pikliowana cebula, rukola,...',
        price: '42,00 zł',
        rating: null,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=200&h=200',
        available: false,
        tags: ['🌱 Vege'],
    },
    {
        id: 3,
        name: 'Frytki z Batatów z dipem',
        desc: 'Grubo krojone frytki z batatów, posypane solą morską, serwowane...',
        price: '18,00 zł',
        rating: null,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=200&h=200',
        available: true,
        tags: [],
    },
];

export default function MenuEditor() {
    const [activeCat, setActiveCat] = useState(0);
    const [items, setItems] = useState(MENU_ITEMS);

    const toggleAvailability = (id) => {
        setItems(items.map(i => i.id === id ? { ...i, available: !i.available } : i));
    };

    return (
        <div className="min-h-full bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="bg-gray-900 px-5 pt-12 pb-4">
                <div className="flex justify-between items-center mb-4">
                    <button className="text-gray-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <h1 className="text-white text-xl font-black">Edytor Menu</h1>
                    <div className="relative">
                        <Bell size={22} className="text-gray-400" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full" />
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-0 border-b border-gray-700">
                    {CATEGORIES.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCat(i)}
                            className={`flex-1 py-2.5 text-sm font-bold transition-colors relative ${activeCat === i ? 'text-orange-400' : 'text-gray-500'
                                }`}
                        >
                            {cat}
                            {activeCat === i && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 rounded-full" />}
                        </button>
                    ))}
                </div>
            </header>

            {/* Search + Add */}
            <div className="px-4 py-3 bg-gray-900 flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        placeholder="Szukaj..."
                        className="w-full bg-gray-800 text-gray-200 placeholder-gray-500 pl-10 pr-4 py-3 rounded-xl text-sm border border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 rounded-xl flex items-center gap-1.5 text-sm flex-shrink-0 active:scale-95 transition-all">
                    <Plus size={18} /> Nowe Danie
                </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 bg-white px-4 pt-2 pb-24 flex flex-col divide-y divide-gray-50">
                {items.map((item) => (
                    <div key={item.id} className="py-4">
                        <div className="flex gap-3">
                            {/* Image */}
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                {item.rating && (
                                    <div className="absolute top-1.5 left-1.5 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                        ⭐ {item.rating}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-bold text-sm text-gray-900 leading-tight">{item.name}</h3>
                                    <button className="text-gray-300 flex-shrink-0"><MoreVertical size={16} /></button>
                                </div>
                                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{item.desc}</p>
                                <p className="text-base font-black text-gray-900 mt-1.5">{item.price}</p>

                                {/* Tags */}
                                {item.tags.length > 0 && (
                                    <div className="flex gap-1.5 mt-2 flex-wrap">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Toggle */}
                        <div className="flex justify-between items-center mt-3">
                            <button className="flex items-center gap-1.5 text-gray-400 text-xs hover:text-orange-500 transition-colors">
                                <Pencil size={13} /> Edytuj
                            </button>
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-bold ${item.available ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {item.available ? 'Dostępne' : 'Brak'}
                                </span>
                                <button
                                    onClick={() => toggleAvailability(item.id)}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${item.available ? 'bg-orange-500' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${item.available ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
