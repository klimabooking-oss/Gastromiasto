import React, { useState } from 'react';
import { Bell, User, TrendingUp, TrendingDown, BarChart2, Star, MessageSquare, AlertTriangle } from 'lucide-react';

const salesData = [
    { hour: '10', val: 30 },
    { hour: '12', val: 55 },
    { hour: '14', val: 80 },
    { hour: '16', val: 95 },
    { hour: '18', val: 65 },
    { hour: '20', val: 40 },
];
const maxVal = Math.max(...salesData.map(d => d.val));

export default function Dashboard() {
    const [panicMode, setPanicMode] = useState(false);

    return (
        <div className="min-h-full bg-gray-50 pb-6">
            {/* Header */}
            <header className="bg-[#1a202c] px-5 pt-12 pb-6">
                <div className="flex justify-between items-center mb-4">
                    <button className="text-gray-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div className="text-center">
                        <div className="text-xs text-gray-400 uppercase tracking-widest">GastroMiasto B2B</div>
                        <div className="text-sm font-bold text-orange-400">Pulpit Główny</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        LT
                    </div>
                </div>

                {/* PANIC BUTTON */}
                <button
                    onClick={() => setPanicMode(!panicMode)}
                    className={`w-full py-4 rounded-2xl font-black text-lg tracking-wide flex items-center justify-center gap-3 transition-all duration-300 ${panicMode
                            ? 'bg-red-700 text-white shadow-inner'
                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg active:scale-95'
                        }`}
                >
                    🔥 {panicMode ? 'TRYB PANIKI AKTYWNY!' : 'TRYB PANIKI'}
                </button>
            </header>

            <div className="px-5 pt-5 flex flex-col gap-4">
                {/* Savings card */}
                <div
                    className="rounded-2xl p-5 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-green-200 uppercase tracking-widest font-bold mb-1">Zaoszczędzona Prowizja</p>
                            <div className="text-4xl font-black text-white">1 450 <span className="text-2xl font-bold">PLN</span></div>
                            <p className="text-green-200 text-sm mt-1">W tym miesiącu dzięki GastroMiasto.</p>
                        </div>
                        <div className="text-5xl opacity-30">🐷</div>
                    </div>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-wide flex items-center gap-1">
                            <BarChart2 size={12} className="text-gray-400" /> Przychód (Dziś)
                        </p>
                        <p className="text-2xl font-black text-gray-900 mt-1">4 280 zł</p>
                        <p className="text-xs text-green-500 font-bold mt-1 flex items-center gap-1">
                            <TrendingUp size={12} /> +12% vs wczoraj
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-wide flex items-center gap-1">
                            <MessageSquare size={12} className="text-gray-400" /> Zamówienia
                        </p>
                        <p className="text-2xl font-black text-gray-900 mt-1">84</p>
                        <p className="text-xs text-red-500 font-bold mt-1 flex items-center gap-1">
                            <TrendingDown size={12} /> -3% vs wczoraj
                        </p>
                    </div>
                </div>

                {/* Sales Chart */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <BarChart2 size={18} className="text-orange-500" />
                            <h3 className="font-bold text-gray-900">Sprzedaż wg godzin</h3>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Dzisiaj</span>
                    </div>
                    <div className="flex items-end gap-2 h-28 relative">
                        {salesData.map((d, i) => {
                            const isMax = d.val === maxVal;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    {isMax && (
                                        <div className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full font-bold mb-1">Peak</div>
                                    )}
                                    <div
                                        className={`w-full rounded-t-lg transition-all ${isMax ? 'bg-orange-500' : 'bg-orange-200'}`}
                                        style={{ height: `${(d.val / maxVal) * 90}%` }}
                                    />
                                    <span className="text-[10px] text-gray-400">{d.hour}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-orange-500">
                            <Star size={16} className="fill-orange-500" />
                            <h3 className="font-bold text-gray-900">Najnowsze Opinie</h3>
                        </div>
                        <button className="text-orange-500 text-sm font-semibold">Zobacz wszystkie</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ReviewCard
                            name="Karolina M."
                            time="20 min temu"
                            order="Zamówienie #4829"
                            stars={5}
                            text="Burger z szarpaną wieprzowinią to mistrzostwo świata! Dostawa gorąca i przed czasem. Będę zamawiać częściej."
                            tag="🍔 Burger Drwala"
                            initial="K"
                            color="bg-orange-500"
                        />
                        <ReviewCard
                            name="Tomasz W."
                            time="1 godz. temu"
                            order="Zamówienie #4821"
                            stars={4}
                            text="Wszystko smaczne, ale frytki trochę zmiękły w transporcie. Reszta super."
                            initial="TW"
                            color="bg-gray-700"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ name, time, order, stars, text, tag, initial, color }) {
    return (
        <div className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {initial}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <p className="font-bold text-sm text-gray-900">{name}</p>
                        <span className="text-xs text-gray-400">{time}</span>
                    </div>
                    <p className="text-xs text-gray-400">{order}</p>
                </div>
            </div>
            <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-100'} />
                ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">{text}</p>
            {tag && (
                <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">{tag}</span>
            )}
            <button className="mt-3 w-full border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                ↩ Odpowiedz
            </button>
        </div>
    );
}
