import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Heart, Star, Clock, Info, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Menu() {
    const navigate = useNavigate();
    const [deliveryType, setDeliveryType] = useState('dostawa');

    const categories = ['Polecane', 'Burgery Klasyczne', 'Dodatki', 'Napoje'];

    const menuItems = [
        {
            id: 1,
            name: 'Burger Drwala',
            description: 'Wołowina 200g, bekon, ser cheddar, prażona cebula, sos BBQ, sałata.',
            price: '35,00 PLN',
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=200',
        },
        {
            id: 2,
            name: 'Vege Szaleństwo',
            description: 'Cieciorka, czerwona fasola, guacamole, rukola, sos mango majo.',
            price: '32,00 PLN',
            image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=200',
        },
        {
            id: 3,
            name: 'Frytki z Batatów',
            description: 'Z autorskim sosem czosnkowym.',
            price: '16,00 PLN',
            image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=200',
        }
    ];

    return (
        <div className="relative min-h-full pb-24 bg-gray-50 flex flex-col">
            {/* Header Image */}
            <div className="relative h-60 bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
                    alt="Restaurant Cover"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center text-white z-10 pt-12">
                    <button onClick={() => navigate(-1)} className="p-2 bg-black/30 backdrop-blur-md rounded-full">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex gap-3">
                        <button className="p-2 bg-white text-primary rounded-full shadow-lg">
                            <Search size={20} />
                        </button>
                        <button className="p-2 bg-white text-primary rounded-full shadow-lg">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Card (Overlapping) */}
            <div className="px-5 -mt-16 z-20 relative">
                <div className="bg-white rounded-2xl shadow-lg p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-2xl font-bold text-primary">Pasibus - Rynek</h1>
                        <div className="flex items-center gap-1 bg-green-50 text-success px-2 py-1 rounded-lg">
                            <Star size={14} className="fill-success text-success" />
                            <span className="font-bold text-sm">4.8</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 font-medium">Burgery • Amerykańska</p>

                    <div className="flex justify-between items-center text-sm font-medium border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <Clock size={16} className="text-orange-500" /> 25-35 min
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <Info size={16} className="text-blue-500" /> Min. 40 PLN
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery Toggle & Categories */}
            <div className="px-5 mt-6 sticky top-0 bg-gray-50/90 backdrop-blur-xl z-10 pt-2 pb-4 border-b border-gray-100">
                {/* Toggle */}
                <div className="bg-gray-200 p-1 rounded-xl flex mb-4">
                    <button
                        className={cn(
                            "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                            deliveryType === 'dostawa' ? "bg-white shadow text-primary" : "text-gray-500"
                        )}
                        onClick={() => setDeliveryType('dostawa')}
                    >
                        Dostawa
                    </button>
                    <button
                        className={cn(
                            "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                            deliveryType === 'odbior' ? "bg-white shadow text-primary" : "text-gray-500"
                        )}
                        onClick={() => setDeliveryType('odbior')}
                    >
                        Odbiór osobisty
                    </button>
                </div>

                {/* Categories Pills */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border",
                                idx === 0
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-primary border-gray-200 hover:border-orange-500"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu List */}
            <div className="px-5 mt-4 flex flex-col gap-4">
                {menuItems.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 items-center justify-between border border-transparent hover:border-orange-100 transition-colors">
                        <div className="flex-1 pr-2">
                            <h3 className="font-bold text-base text-primary mb-1">{item.name}</h3>
                            <p className="text-gray-500 text-sm leading-snug line-clamp-2">{item.description}</p>
                            <p className="text-orange-500 font-bold mt-2">{item.price}</p>
                        </div>
                        <div className="relative w-24 h-24 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl shadow-sm" />
                            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-gray-100 shadow-md rounded-full flex items-center justify-center text-primary hover:text-orange-500 transition-colors">
                                <Plus size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed sm:absolute bottom-0 w-full sm:w-full max-w-md bg-white border-t border-gray-100 p-4 pb-safe z-50">
                <button onClick={() => navigate('/checkout')} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-between items-center px-6">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span>Zobacz Koszyk</span>
                    <span>67,00 PLN</span>
                </button>
            </div>
        </div>
    );
}
