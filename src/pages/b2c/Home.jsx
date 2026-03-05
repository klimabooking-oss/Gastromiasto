import React, { useState, useRef } from 'react';
import { Search, SlidersHorizontal, Star, Clock, CheckCircle, ChevronRight, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, RESTAURANTS } from '../../data/restaurants';

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [festivalMode, setFestivalMode] = useState(false);
    const catRef = useRef(null);
    const navigate = useNavigate();

    const filtered = RESTAURANTS.filter((r) => {
        const matchCat = activeCategory === 'all' || r.category === activeCategory;
        const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    const handleRestaurantClick = (restaurant) => {
        // store selected restaurant in sessionStorage for Menu page
        sessionStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
        navigate('/home/menu');
    };

    return (
        <div className="flex flex-col min-h-full pb-6 bg-gray-50">
            {/* Header */}
            <header className="px-5 pt-12 pb-4 bg-white sticky top-0 z-20 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🍽️</span>
                            <h1 className="text-xl font-black tracking-tight text-gray-900">
                                Gastro<span className="text-orange-500">Miasto</span>
                            </h1>
                        </div>
                        <div className="flex items-center text-xs text-gray-400 gap-1 mt-1">
                            <MapPin size={12} className="text-orange-500" />
                            <span className="font-semibold text-gray-600">Wrocław, Rynek 12</span>
                            <ChevronRight size={12} className="text-gray-300" />
                        </div>
                    </div>

                    <button
                        onClick={() => setFestivalMode(!festivalMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black tracking-wider transition-all duration-300 ${festivalMode
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'bg-gray-50 border-gray-200 text-gray-500'
                            }`}
                    >
                        <div className={`w-2 h-2 rounded-full transition-colors ${festivalMode ? 'bg-white' : 'bg-gray-300'}`} />
                        FESTIWAL
                    </button>
                </div>

                {/* Search */}
                <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Czego szukasz we Wrocławiu?"
                            className="w-full bg-gray-100 text-sm font-medium pl-11 pr-4 py-3.5 rounded-2xl border-none focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none transition-all"
                        />
                    </div>
                    <button className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform shadow-md shadow-orange-200">
                        <SlidersHorizontal size={18} className="text-white" />
                    </button>
                </div>
            </header>

            {/* Categories */}
            <section className="px-4 pt-4 pb-2 bg-white border-b border-gray-100">
                <div
                    ref={catRef}
                    className="flex gap-3 overflow-x-auto no-scrollbar pb-1 snap-scroll"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`snap-item flex flex-col items-center gap-1.5 flex-shrink-0 transition-all duration-200 active:scale-95 ${activeCategory === cat.id ? 'opacity-100' : 'opacity-70'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${activeCategory === cat.id
                                    ? 'bg-orange-500 shadow-lg shadow-orange-200 scale-105'
                                    : 'bg-white border border-gray-100 shadow-sm'
                                }`}>
                                {cat.icon}
                            </div>
                            <span className={`text-[11px] font-bold whitespace-nowrap ${activeCategory === cat.id ? 'text-orange-500' : 'text-gray-500'
                                }`}>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Feed */}
            <section className="px-4 pt-4 flex-1 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-black text-gray-900">
                        {activeCategory === 'all' ? 'Polecane we Wrocławiu' : `${CATEGORIES.find(c => c.id === activeCategory)?.name} we Wrocławiu`}
                    </h2>
                    <span className="text-xs text-gray-400 font-medium bg-white px-2 py-1 rounded-full border border-gray-100">
                        {filtered.length} miejsc
                    </span>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-4xl mb-3">🔍</p>
                        <p className="text-gray-500 font-semibold">Brak wyników</p>
                        <p className="text-gray-400 text-sm">Spróbuj innej frazy lub kategorii</p>
                    </div>
                )}

                <div className="flex flex-col gap-5">
                    {filtered.map((restaurant, idx) => (
                        <button
                            key={restaurant.id}
                            onClick={() => handleRestaurantClick(restaurant)}
                            className={`block text-left w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover animate-fade-in-up`}
                            style={{ animationDelay: `${idx * 80}ms` }}
                        >
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden bg-gray-200">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                {/* Badge */}
                                <div className="absolute top-3 right-3 bg-green-500 text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                                    🍃 {restaurant.badge}
                                </div>

                                {/* Bottom label */}
                                <div className="absolute bottom-3 left-3 bg-white text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                                    <CheckCircle size={11} className="text-green-500" />
                                    Lokalna Jakość
                                </div>

                                {/* Rating pill */}
                                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <Star size={12} className="text-orange-500 fill-orange-500" />
                                    {restaurant.rating}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0 pr-2">
                                        <h3 className="font-black text-base text-gray-900 truncate">{restaurant.name}</h3>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">{restaurant.tagline}</p>
                                    </div>
                                    <span className="flex-shrink-0 text-xs text-gray-400">({restaurant.reviews})</span>
                                </div>

                                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} className="text-gray-400" />
                                        <span className="font-semibold">{restaurant.time}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                                    <div className="font-semibold">
                                        {restaurant.deliveryFee > 0 ? `Dostawa ${restaurant.deliveryFee} zł` : 'Darmowa dostawa'}
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                                    <div>Min. {restaurant.minOrder} zł</div>
                                </div>

                                {/* Popular dishes preview */}
                                <div className="mt-3 flex gap-1.5 overflow-hidden">
                                    {restaurant.menu.filter(m => m.popular).slice(0, 2).map((item) => (
                                        <span key={item.id} className="text-[10px] bg-orange-50 text-orange-700 font-medium px-2 py-0.5 rounded-full truncate max-w-[140px]">
                                            {item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}
