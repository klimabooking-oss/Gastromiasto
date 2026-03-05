import React, { useState } from 'react';
import { Plus, Minus, Pencil, MoreVertical, MapPin } from 'lucide-react';

const ZONES = [
    { id: 1, name: 'Śródmieście (Cen...', fee: '0,00 zł', desc: 'Bezpłatna strefa dostawy (2km)', color: 'bg-blue-500', active: true },
    { id: 2, name: 'Mokotów', fee: '4,50 zł', desc: 'Rozszerzona strefa (2–5km)', color: 'bg-orange-500', active: true },
    { id: 3, name: 'Praga-Północ', fee: null, desc: 'Obecnie niedostępna', color: 'bg-gray-300', active: false, disabled: true },
];

export default function Zones() {
    const [externalCourier, setExternalCourier] = useState(true);

    return (
        <div className="min-h-full bg-gray-50 flex flex-col">
            {/* Map Placeholder */}
            <div className="relative h-56 bg-gray-200 overflow-hidden flex-shrink-0">
                <iframe
                    title="Mapa Wrocław"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'saturate(0.8) brightness(0.95)' }}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=17.0,51.08,17.08,51.12&layer=mapnik"
                />
                {/* Overlay zones */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[25%] left-[30%] w-24 h-16 rounded-xl bg-green-500 opacity-40 border-2 border-green-600" />
                    <div className="absolute top-[35%] left-[52%] w-20 h-14 rounded-xl bg-orange-500 opacity-40 border-2 border-orange-600" />
                </div>

                {/* Back */}
                <button className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Zoom controls */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 font-bold text-xl"><Plus size={18} /></button>
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 font-bold text-xl"><Minus size={18} /></button>
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Bottom Sheet */}
            <div className="flex-1 bg-white rounded-t-3xl -mt-4 shadow-xl px-5 pt-4 pb-24">
                {/* Handle */}
                <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-black text-gray-900">Ustawienia stref</h2>
                    <span className="text-xs bg-green-100 text-green-600 font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        ✅ Aktywne
                    </span>
                </div>

                {/* External Courier Toggle */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-5 flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📍</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-900">Zewnętrzni kurierzy</p>
                        <p className="text-xs text-gray-500 mt-0.5">Aktywuj kurierów backup gdy popyt rośnie.</p>
                    </div>
                    <button
                        onClick={() => setExternalCourier(!externalCourier)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${externalCourier ? 'bg-[#1a202c]' : 'bg-gray-300'}`}
                    >
                        <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${externalCourier ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                {/* Zones list */}
                <div className="mb-2">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">Aktywne Strefy</p>
                    <div className="flex flex-col gap-3">
                        {ZONES.map((zone) => (
                            <div
                                key={zone.id}
                                className={`flex items-center gap-3 p-4 rounded-2xl border ${zone.disabled ? 'opacity-50 border-gray-100 bg-gray-50' : 'border-gray-100 bg-white shadow-sm'}`}
                            >
                                <div className={`w-10 h-10 ${zone.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    <MapPin size={18} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className={`font-bold text-sm truncate ${zone.disabled ? 'line-through text-gray-400' : 'text-gray-900'}`}>{zone.name}</p>
                                        {zone.disabled && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Wyłączona</span>}
                                        {!zone.disabled && zone.fee && <span className="font-bold text-gray-900 text-sm">{zone.fee}</span>}
                                        {!zone.disabled && !zone.fee && <span className="font-bold text-green-500 text-sm">0,00 zł</span>}
                                    </div>
                                    <p className="text-xs text-gray-400">{zone.desc}</p>
                                </div>
                                {zone.disabled ? (
                                    <button className="text-gray-300"><MoreVertical size={18} /></button>
                                ) : (
                                    <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                                        <Pencil size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Zone CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base shadow-lg active:scale-95 transition-all">
                        <MapPin size={20} /> Dodaj nową strefę
                    </button>
                </div>
            </div>
        </div>
    );
}
