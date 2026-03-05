import React from 'react';
import { Search, MapPin, SlidersHorizontal, Star, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    const categories = [
        { id: 1, name: 'Pizza', icon: '🍕' },
        { id: 2, name: 'Zdrowe', icon: '🥗' },
        { id: 3, name: 'Burgery', icon: '🍔' },
        { id: 4, name: 'Sushi', icon: '🍣' },
        { id: 5, name: 'Kebab', icon: '🥙' },
    ];

    const restaurants = [
        {
            id: 1,
            name: 'Pasibus - Rynek',
            rating: 4.8,
            reviews: 342,
            category: 'Burgery • Amerykańska',
            time: '25-35 min',
            deliveryFee: 'Dostawa 9 zł',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
            badge: '0% PROWIZJI',
        },
        {
            id: 2,
            name: 'Młoda Polska Bistro',
            rating: 4.9,
            reviews: 128,
            category: 'Polska • Autorska',
            time: '40-55 min',
            deliveryFee: 'Dostawa 12 zł',
            image: 'https://images.unsplash.com/photo-1544025162-831441a774bd?auto=format&fit=crop&q=80&w=800',
            badge: '0% PROWIZJI',
        }
    ];

    return (
        <div className="flex flex-col min-h-full pb-6">
            {/* Header */}
            <header className="px-5 pt-12 pb-4 bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-tight text-primary">GastroMiasto<span className="text-orange-500">.</span></h1>
                        <div className="flex items-center text-sm text-gray-500 gap-1 mt-1">
                            <MapPin size={14} className="text-orange-500" />
                            <span className="font-medium text-primary">Wrocław, Rynek 12</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <span className="text-xs font-bold text-gray-600 tracking-wider">FESTIWAL</span>
                    </button>
                </div>

                {/* Search */}
                <div className="relative flex items-center">
                    <Search className="absolute left-4 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Czego szukasz we Wrocławiu?"
                        className="w-full bg-gray-100 text-sm font-medium pl-12 pr-12 py-3.5 rounded-xl border-none focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                    <button className="absolute right-4 text-primary">
                        <SlidersHorizontal size={20} />
                    </button>
                </div>
            </header>

            {/* Categories */}
            <section className="px-5 py-4">
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[72px]">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-gray-100">
                                {cat.icon}
                            </div>
                            <span className="text-xs font-semibold text-gray-700">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feed */}
            <section className="px-5 pt-2 flex-1">
                <h2 className="text-lg font-bold mb-4 text-primary">Polecane we Wrocławiu</h2>

                <div className="flex flex-col gap-6">
                    {restaurants.map((restaurant) => (
                        <Link to="/menu" key={restaurant.id} className="block group">
                            <div className="relative rounded-2xl overflow-hidden h-48 mb-3 bg-gray-200 shadow-sm">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Badges */}
                                <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                                    <span>🍃</span> {restaurant.badge}
                                </div>

                                <div className="absolute bottom-3 left-3 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                                    <CheckCircle size={12} className="text-success" />
                                    Lokalna Jakość
                                </div>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-primary">{restaurant.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-0.5">{restaurant.category}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                                    <Star size={14} className="text-orange-500 fill-orange-500" />
                                    <span className="font-bold text-sm">{restaurant.rating}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 font-medium">
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {restaurant.time}
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                <div>{restaurant.deliveryFee}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
