import React, { useState } from 'react';
import { Flame, TrendingUp, AlertCircle, ShoppingBag, DollarSign, MessageSquare, Star, Reply } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Dashboard() {
    const [panicMode, setPanicMode] = useState(false);

    return (
        <div className="flex flex-col gap-6 fade-in">
            {/* Header / Greeting */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Cześć, Pasibus Rynek! 👋</h1>
                    <p className="text-gray-500 font-medium mt-1">Oto podsumowanie dzisiejszego dnia.</p>
                </div>

                {/* Panic Button */}
                <button
                    onClick={() => setPanicMode(!panicMode)}
                    className={cn(
                        "flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl shadow-lg transition-all",
                        panicMode
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                    )}
                >
                    <Flame size={20} className={panicMode ? "text-red-500" : "text-white"} />
                    {panicMode ? "WYŁĄCZ TRYB PANIKI" : "TRYB PANIKI"}
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
                        <ShoppingBag size={20} />
                        Aktywne zamówienia
                    </div>
                    <div className="text-4xl font-bold text-primary">12</div>
                    <div className="absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <AlertCircle size={14} /> Pilne: 2
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
                        <DollarSign size={20} />
                        Dzisiejszy utarg
                    </div>
                    <div className="flex items-end gap-3">
                        <div className="text-4xl font-bold text-primary">4 250 zł</div>
                        <div className="flex items-center gap-1 text-success text-sm font-bold bg-green-50 px-2 py-1 rounded-lg mb-1">
                            <TrendingUp size={16} /> +15% vs wczoraj
                        </div>
                    </div>
                </div>

                <div className="bg-success rounded-2xl p-6 shadow-lg shadow-green-500/20 text-white md:col-span-2 lg:col-span-1 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                        <DollarSign size={160} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 font-bold opacity-90 mb-1">
                            <span className="text-xl">🍃</span> ZAOSZCZĘDZONA PROWIZJA
                        </div>
                        <div className="text-5xl font-black mb-2 tracking-tight">1 850 zł</div>
                        <p className="opacity-80 font-medium text-sm">W tym miesiącu dzięki GastroMiasto.</p>
                    </div>
                </div>
            </div>

            {/* Middle Section (Charts & Reviews) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Placeholder */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-primary">Sprzedaż wg godzin</h3>
                        <select className="bg-gray-50 border border-gray-200 text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500">
                            <option>Dzisiaj</option>
                            <option>Wczoraj</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2">
                        {/* Simple Bar Chart Mockup */}
                        {[40, 60, 30, 80, 100, 70, 50, 90, 110, 85, 45, 20].map((h, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 gap-2">
                                <div
                                    className="w-full bg-orange-200 rounded-t-sm hover:bg-orange-500 transition-colors"
                                    style={{ height: `${h}%` }}
                                ></div>
                                <span className="text-xs text-gray-400 font-medium">{10 + i}:00</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-[340px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                            <MessageSquare size={20} className="text-gray-400" />
                            Najnowsze opinie
                        </h3>
                        <button className="text-orange-500 text-sm font-bold hover:underline">Wszystkie</button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 no-scrollbar">
                        {[1, 2].map(review => (
                            <div key={review} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold text-primary text-sm">Michał K.</div>
                                    <div className="flex text-orange-500">
                                        <Star size={14} className="fill-orange-500" />
                                        <Star size={14} className="fill-orange-500" />
                                        <Star size={14} className="fill-orange-500" />
                                        <Star size={14} className="fill-orange-500" />
                                        <Star size={14} className="fill-orange-500" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 leading-snug">
                                    Świetny burger! Dostawa szybciej niż przewidywano. Zero dopłat za obsługę - szanuję to.
                                </p>
                                <button className="text-sm font-bold text-gray-500 hover:text-orange-500 flex items-center gap-1.5 transition-colors">
                                    <Reply size={16} /> Odpowiedz
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
