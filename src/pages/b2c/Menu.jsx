import React, { useState, useEffect } from 'react';
import { Star, Clock, CheckCircle, ChevronLeft, Truck, Store, ShoppingCart, Plus, Minus, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../../data/restaurants';

export default function Menu() {
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [deliveryMode, setDeliveryMode] = useState('delivery');
    const [activeCategory, setActiveCategory] = useState('all');
    const [cart, setCart] = useState({});
    const [showCartBar, setShowCartBar] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem('selectedRestaurant');
        if (stored) {
            setRestaurant(JSON.parse(stored));
        } else {
            // fallback to first restaurant
            setRestaurant(RESTAURANTS[0]);
        }
    }, []);

    const addToCart = (item) => {
        const next = { ...cart, [item.id]: (cart[item.id] || 0) + 1 };
        setCart(next);
        setShowCartBar(true);
    };
    const removeFromCart = (item) => {
        const next = { ...cart };
        if (next[item.id] > 1) next[item.id]--;
        else delete next[item.id];
        setCart(next);
        setShowCartBar(Object.keys(next).length > 0);
    };

    const totalItems = Object.values(cart).reduce((s, v) => s + v, 0);
    const totalPrice = restaurant
        ? restaurant.menu.reduce((s, item) => s + (cart[item.id] || 0) * item.price, 0)
        : 0;

    if (!restaurant) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-full bg-gray-50">
            {/* Hero */}
            <div className="relative h-52 overflow-hidden bg-gray-300 flex-shrink-0">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-12 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                >
                    <ChevronLeft size={20} className="text-gray-700" />
                </button>

                {/* Restaurant info overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-xl font-black text-white">{restaurant.name}</h1>
                    <p className="text-xs text-gray-300 mt-0.5">{restaurant.tagline}</p>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-xs font-bold">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300 text-xs">
                            <Clock size={12} />
                            <span>{restaurant.time}</span>
                        </div>
                        <div className="text-xs text-green-400 font-bold">🍃 0% prowizji</div>
                    </div>
                </div>
            </div>

            {/* Delivery toggle */}
            <div className="bg-white px-4 py-4 flex gap-2">
                <button
                    onClick={() => setDeliveryMode('delivery')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 ${deliveryMode === 'delivery'
                            ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                >
                    <Truck size={16} /> Dostawa
                </button>
                <button
                    onClick={() => setDeliveryMode('pickup')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 ${deliveryMode === 'pickup'
                            ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                >
                    <Store size={16} /> Odbiór osobisty
                </button>
            </div>

            {/* Menu items */}
            <div className="flex-1 px-4 pb-32 pt-2 flex flex-col gap-3">
                <h2 className="font-black text-gray-900 text-sm mt-2 mb-1">Menu</h2>
                {restaurant.menu.map((item, idx) => (
                    <div
                        key={item.id}
                        className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover animate-fade-in-up`}
                        style={{ animationDelay: `${idx * 80}ms` }}
                    >
                        <div className="flex gap-0">
                            {/* Image */}
                            <div className="relative w-28 h-28 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                                {item.popular && (
                                    <div className="absolute top-1.5 left-1.5 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">
                                        🔥 Hit
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                                <div>
                                    <h3 className="font-bold text-sm text-gray-900 leading-tight">{item.name}</h3>
                                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{item.desc}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-base font-black text-gray-900">{item.price},00 zł</span>
                                    <div className="flex items-center gap-1">
                                        {cart[item.id] > 0 && (
                                            <>
                                                <button
                                                    onClick={() => removeFromCart(item)}
                                                    className="w-7 h-7 rounded-full border-2 border-orange-500 flex items-center justify-center active:scale-90 transition-transform"
                                                >
                                                    <Minus size={14} className="text-orange-500" />
                                                </button>
                                                <span className="w-6 text-center font-black text-sm text-gray-900">{cart[item.id]}</span>
                                            </>
                                        )}
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
                                        >
                                            <Plus size={16} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky cart bar */}
            {showCartBar && totalItems > 0 && (
                <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 z-40 animate-slide-in-bottom">
                    <Link
                        to="/home/checkout"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-5 rounded-2xl flex items-center justify-between shadow-xl shadow-orange-300 btn-glow-orange active:scale-95 transition-all"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-white/20 rounded-xl flex items-center justify-center text-sm font-black">
                                {totalItems}
                            </div>
                            <span>Zobacz koszyk</span>
                        </div>
                        <span className="text-lg">{totalPrice},00 zł</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
