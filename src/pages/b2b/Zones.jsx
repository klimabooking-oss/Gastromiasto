import React, { useState } from 'react';
import { MapPin, Edit2, Truck, Plus, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Zones() {
    const [externalFleet, setExternalFleet] = useState(false);

    return (
        <div className="flex flex-col h-full fade-in gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Logistyka i Strefy Dostaw</h1>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative h-64 md:h-96">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
                    alt="Map"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    {/* Fake Zones overlaying the map */}
                    <div className="absolute w-64 h-64 rounded-full bg-green-500/20 mix-blend-multiply border-2 border-green-500 transform -translate-x-12"></div>
                    <div className="absolute w-80 h-80 rounded-full bg-orange-500/20 mix-blend-multiply border-2 border-orange-500 transform translate-x-24 -translate-y-8"></div>

                    {/* Restaurant Pin */}
                    <div className="absolute bg-white p-2 rounded-full shadow-xl">
                        <div className="w-4 h-4 rounded-full bg-primary relative">
                            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white rounded-xl shadow-md font-bold text-primary flex items-center justify-center hover:bg-gray-50">+</button>
                    <button className="w-10 h-10 bg-white rounded-xl shadow-md font-bold text-primary flex items-center justify-center hover:bg-gray-50">-</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Zones List */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-primary">Zarządzaj Strefami</h2>
                        <button className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                            <Plus size={16} /> Dodaj strefę
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Zone 1 */}
                        <div className="p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-colors bg-green-50/30 flex justify-between items-center">
                            <div className="flex items-start gap-3">
                                <div className="w-4 h-4 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                                <div>
                                    <h3 className="font-bold text-primary">Strefa 1 (Zielona)</h3>
                                    <p className="text-sm text-gray-500 font-medium">Min. order: 50 PLN • Dostawa: 0 PLN</p>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors bg-white shadow-sm border border-gray-100 rounded-lg">
                                <Edit2 size={16} />
                            </button>
                        </div>

                        {/* Zone 2 */}
                        <div className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 transition-colors bg-orange-50/30 flex justify-between items-center">
                            <div className="flex items-start gap-3">
                                <div className="w-4 h-4 rounded-full bg-orange-500 mt-1 flex-shrink-0"></div>
                                <div>
                                    <h3 className="font-bold text-primary">Strefa 2 (Pomarańczowa)</h3>
                                    <p className="text-sm text-gray-500 font-medium">Min. order: 80 PLN • Dostawa: 15 PLN</p>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors bg-white shadow-sm border border-gray-100 rounded-lg">
                                <Edit2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* External Fleet Details */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
                            <Truck size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-primary mb-2">Wsparcie Zewnętrznego Kuriera</h2>
                        <p className="text-sm text-gray-500 leading-snug mb-6 font-medium">
                            Aktywuj zewnętrznych kurierów dla stref przy dużym ruchu. Zapewiamy integrację z lokalnymi flotami po preferencyjnych stawkach B2B.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100">
                        <span className={cn("font-bold text-sm", externalFleet ? "text-primary" : "text-gray-500")}>
                            Status: {externalFleet ? "Aktywny" : "Wyłączony"}
                        </span>
                        <button
                            onClick={() => setExternalFleet(!externalFleet)}
                            className={cn(
                                "relative inline-flex h-7 w-14 items-center rounded-full transition-colors",
                                externalFleet ? "bg-blue-500" : "bg-gray-300"
                            )}
                        >
                            <span className={cn(
                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out",
                                externalFleet ? "translate-x-8" : "translate-x-1"
                            )} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
