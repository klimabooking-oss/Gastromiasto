import React, { useState } from 'react';
import { Plus, Search, Info, Leaf, SwitchCamera } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function MenuEditor() {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Burger Klasyk',
            category: 'Dania Główne',
            description: 'Wołowina 100% 200g, sałata, pomidor, pikle, czerwona cebula, sos autorski.',
            price: '28,00 zł',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200',
            available: true,
            tags: ['Alergeny: Gluten']
        },
        {
            id: 2,
            name: 'Burger Drwala',
            category: 'Dania Główne',
            description: 'Wołowina 200g, bekon, ser cheddar, prażona cebula, sos BBQ, sałata.',
            price: '35,00 zł',
            image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=200',
            available: false,
            tags: ['Bestseller', 'Nowość']
        },
        {
            id: 3,
            name: 'Vege Szaleństwo',
            category: 'Dania Główne',
            description: 'Cieciorka, czerwona fasola, guacamole, rukola, sos mango majo.',
            price: '32,00 zł',
            image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=200',
            available: true,
            tags: ['Wegańskie']
        }
    ]);

    const toggleAvailability = (id) => {
        setItems(items.map(i => i.id === id ? { ...i, available: !i.available } : i));
    };

    return (
        <div className="flex flex-col h-full fade-in">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Edytor Menu</h1>
                <button className="bg-primary hover:bg-gray-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2">
                    <Plus size={18} /> Nowe Danie
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 flex items-center px-4 py-2">
                <Search size={20} className="text-gray-400" />
                <input type="text" placeholder="Szukaj dania po nazwie lub opisie" className="w-full bg-transparent p-2 outline-none text-sm font-medium" />
            </div>

            <div className="flex gap-2 mb-6 border-b border-gray-200 pb-px overflow-x-auto no-scrollbar">
                {['Wszystkie', 'Dania Główne', 'Przystawki', 'Napoje'].map((cat, i) => (
                    <button key={i} className={cn(
                        "px-4 py-2.5 rounded-t-lg font-bold text-sm whitespace-nowrap transition-colors",
                        i === 1 ? "bg-white border-t border-l border-r border-gray-200 text-primary z-10 -mb-px shadow-sm" : "bg-transparent text-gray-500 hover:text-primary"
                    )}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                {items.map(item => (
                    <div key={item.id} className={cn(
                        "bg-white rounded-2xl p-4 shadow-sm border transition-all flex flex-col md:flex-row gap-4 items-start md:items-center",
                        item.available ? "border-transparent" : "border-gray-200 opacity-60"
                    )}>
                        {/* Thumbnail */}
                        <div className="w-24 h-24 flex-shrink-0 relative">
                            <img src={item.image} alt={item.name} className={cn("w-full h-full object-cover rounded-xl shadow-sm", !item.available && "grayscale")} />
                            {!item.available && (
                                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center font-bold text-white text-xs">
                                    Wyprzedane
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-primary">{item.name}</h3>
                                <span className="font-bold text-orange-500 text-lg md:hidden">{item.price}</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-snug mb-3 max-w-xl">{item.description}</p>
                            <div className="flex gap-2 flex-wrap">
                                {item.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-gray-100 border border-gray-200 text-gray-600 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                        {tag.toLowerCase().includes('wegańskie') && <Leaf size={10} className="text-success" />}
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between md:flex-col items-center md:items-end w-full md:w-auto h-full gap-4 md:gap-8 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-gray-100">
                            <span className="font-bold text-orange-500 text-xl hidden md:block">{item.price}</span>

                            {/* Switcher Component */}
                            <div className="flex items-center gap-3">
                                <span className={cn("font-bold text-sm", item.available ? "text-success" : "text-gray-500")}>
                                    {item.available ? "Dostępne" : "Brak"}
                                </span>
                                <button
                                    onClick={() => toggleAvailability(item.id)}
                                    className={cn(
                                        "relative inline-flex h-7 w-14 items-center rounded-full transition-colors",
                                        item.available ? "bg-success" : "bg-gray-300"
                                    )}
                                >
                                    <span className={cn(
                                        "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out",
                                        item.available ? "translate-x-8" : "translate-x-1"
                                    )} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
