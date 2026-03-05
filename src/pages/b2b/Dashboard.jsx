import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Star, MessageSquare, BarChart2, Info } from 'lucide-react';

// Heatmap data: hours (10-22) × days (Mon-Sun)
// Values 0-4 representing activity intensity
const HOURS = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
const DAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
const HEATMAP = [
    [0, 0, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0], // Pn
    [0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0], // Wt
    [0, 1, 2, 2, 3, 2, 2, 2, 2, 1, 0, 0], // Śr
    [0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 1, 0], // Cz
    [1, 2, 3, 3, 4, 4, 4, 3, 3, 2, 1, 0], // Pt ← today (highlighted)
    [0, 1, 2, 2, 3, 4, 4, 3, 3, 2, 1, 0], // Sb
    [0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0], // Nd
];

const HEAT_LABELS = ['Brak', 'Niski', 'Średni', 'Wysoki', 'Peak'];

function useAnimatedNumber(target, duration = 1200) {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration]);
    return current;
}

export default function Dashboard() {
    const [panicMode, setPanicMode] = useState(false);
    const [tooltip, setTooltip] = useState(null);
    const savings = useAnimatedNumber(1450);
    const revenue = useAnimatedNumber(4280);
    const orders = useAnimatedNumber(84);

    const today = 4; // Friday index

    return (
        <div className="min-h-full bg-gray-50 pb-6">
            {/* Header */}
            <header className="bg-[#1a202c] px-5 pt-12 pb-5">
                <div className="flex justify-between items-center mb-4 animate-fade-in">
                    <button className="text-gray-400 p-1">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div className="text-center">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">GastroMiasto B2B</div>
                        <div className="text-sm font-black text-orange-400">Pulpit Główny</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                        LT
                    </div>
                </div>

                {/* PANIC BUTTON */}
                <button
                    onClick={() => setPanicMode(!panicMode)}
                    className={`w-full py-4 rounded-2xl font-black text-lg tracking-wide flex items-center justify-center gap-3 transition-all duration-300 animate-fade-in-up delay-100 ${panicMode
                            ? 'bg-red-600 text-white shadow-inner animate-panic'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl btn-glow-orange active:scale-95'
                        }`}
                >
                    🔥 {panicMode ? 'TRYB PANIKI AKTYWNY — KLIKNIJ ABY WYŁĄCZYĆ' : 'TRYB PANIKI'}
                </button>
            </header>

            <div className="px-4 pt-4 flex flex-col gap-4">
                {/* Welcome */}
                <div className="animate-fade-in-up delay-150">
                    <p className="text-xl font-black text-gray-900">Cześć, La Trattoria! 👋</p>
                    <p className="text-sm text-gray-400 mt-0.5">Oto podsumowanie dzisiejszego dnia.</p>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-2 gap-3 animate-fade-in-up delay-200">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 card-hover">
                        <div className="flex justify-between items-start">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Aktywne zamówienia</p>
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        </div>
                        <p className="text-2xl font-black text-gray-900 mt-1">{orders}</p>
                        <p className="text-xs text-red-500 font-bold mt-1">Pilne: 2</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 card-hover">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Dzisiejszy utarg</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{revenue.toLocaleString('pl-PL')} zł</p>
                        <p className="text-xs text-green-500 font-bold mt-1 flex items-center gap-1">
                            <TrendingUp size={12} /> +15% vs wczoraj
                        </p>
                    </div>
                </div>

                {/* Savings card */}
                <div
                    className="rounded-2xl p-5 relative overflow-hidden animate-fade-in-up delay-300 card-hover"
                    style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 60%, #34d399 100%)' }}
                >
                    <div className="absolute right-4 top-4 text-green-300 opacity-30 text-7xl">🐷</div>
                    <p className="text-xs text-green-100 uppercase tracking-widest font-bold mb-2">🪙 Zaoszczędzona Prowizja</p>
                    <div className="text-5xl font-black text-white">
                        {savings.toLocaleString('pl-PL')} <span className="text-3xl">zł</span>
                    </div>
                    <p className="text-green-200 text-sm mt-2">W tym miesiącu dzięki GastroMiasto.</p>
                    <div className="mt-3 bg-white/10 rounded-xl px-3 py-1.5 inline-flex items-center gap-1.5 text-xs text-white font-semibold">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        Vs. platforma 30% = –4 134 zł
                    </div>
                </div>

                {/* Heatmap */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-fade-in-up delay-400">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <BarChart2 size={16} className="text-orange-500" />
                            <h3 className="font-black text-gray-900 text-sm">Mapa aktywności godzinowej</h3>
                        </div>
                        <span className="text-[10px] font-bold text-white bg-orange-500 px-2 py-1 rounded-full">Ten tydzień</span>
                    </div>

                    {/* Grid */}
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-full">
                            {/* Hour headers */}
                            <div className="flex items-center gap-1 mb-1.5 pl-7">
                                {HOURS.map((h) => (
                                    <div key={h} className="flex-1 text-center text-[9px] text-gray-400 font-medium">{h}</div>
                                ))}
                            </div>

                            {/* Day rows */}
                            {HEATMAP.map((row, di) => (
                                <div key={di} className="flex items-center gap-1 mb-1">
                                    <div className={`w-6 text-[10px] font-bold flex-shrink-0 ${di === today ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {DAYS[di]}
                                    </div>
                                    {row.map((val, hi) => (
                                        <div
                                            key={hi}
                                            className={`flex-1 h-6 heat-cell heat-${val} ${di === today ? 'ring-1 ring-orange-300/40' : ''} animate-scale-in`}
                                            style={{ animationDelay: `${(di * 12 + hi) * 15}ms` }}
                                            onMouseEnter={() => setTooltip({ d: DAYS[di], h: HOURS[hi], v: val })}
                                            onMouseLeave={() => setTooltip(null)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tooltip */}
                    {tooltip && (
                        <div className="mt-2 bg-gray-900 text-white text-xs px-3 py-2 rounded-xl text-center font-medium">
                            {tooltip.d} {tooltip.h}:00 — {HEAT_LABELS[tooltip.v]} ruch
                        </div>
                    )}

                    {/* Legend */}
                    <div className="flex items-center gap-2 mt-3 justify-end">
                        <span className="text-[10px] text-gray-400">Mniej</span>
                        {[0, 1, 2, 3, 4].map(v => (
                            <div key={v} className={`w-4 h-4 rounded heat-${v}`} />
                        ))}
                        <span className="text-[10px] text-gray-400">Więcej</span>
                    </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-fade-in-up delay-500">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Star size={16} className="text-orange-500 fill-orange-500" />
                            <h3 className="font-black text-gray-900">Najnowsze Opinie</h3>
                        </div>
                        <button className="text-orange-500 text-sm font-semibold hover:text-orange-600 transition-colors">Zobacz wszystkie</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ReviewCard name="Karolina M." time="20 min temu" order="#4829" stars={5}
                            text="Burger z szarpaną wieprzowinią to mistrzostwo świata! Dostawa gorąca i przed czasem."
                            tag="🍔 Burger Drwala" initial="K" color="bg-orange-500" delay="delay-600" />
                        <ReviewCard name="Tomasz W." time="1 godz. temu" order="#4821" stars={4}
                            text="Wszystko smaczne, ale frytki trochę zmiękły w transporcie. Reszta super."
                            initial="TW" color="bg-gray-700" delay="delay-700" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ name, time, order, stars, text, tag, initial, color, delay }) {
    return (
        <div className={`border border-gray-100 rounded-2xl p-4 card-hover animate-fade-in-up ${delay}`}>
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {initial}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <p className="font-bold text-sm text-gray-900">{name}</p>
                        <span className="text-xs text-gray-400">{time}</span>
                    </div>
                    <p className="text-xs text-gray-400">Zamówienie {order}</p>
                </div>
            </div>
            <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-100'} />
                ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">{text}</p>
            {tag && <span className="inline-block text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>}
            <button className="mt-3 w-full border border-gray-100 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2">
                ↩ Odpowiedz
            </button>
        </div>
    );
}
