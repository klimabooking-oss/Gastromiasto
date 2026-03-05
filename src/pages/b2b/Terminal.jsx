import React, { useState, useRef } from 'react';
import { Bell, Printer, Phone, AlertTriangle, ChevronLeft } from 'lucide-react';

const TABS = [
    { label: 'Nowe', count: 5, color: 'text-red-500' },
    { label: 'W przygotowaniu', count: 12, color: 'text-orange-500' },
    { label: 'Gotowe', count: 3, color: 'text-green-500' },
    { label: 'Odebrane', count: null, color: 'text-gray-400' },
];

const ORDERS = [
    {
        id: '#1042', urgent: true, time: '02:45', type: 'Dostawa',
        items: [
            { qty: '2x', name: 'Gastro Burger Combo', note: 'Medium rare, Extra cheese' },
            { qty: '1x', name: 'Słodkie Frytki z Batata', note: 'Majonez czosnkowy osobno' },
        ],
        warning: 'BEZ CEBULI – CIĘŻKA ALERGIA',
    },
    {
        id: '#1043', urgent: false, time: '00:15', type: 'Odbiór',
        items: [
            { qty: '1x', name: 'Wrap Vege', note: 'Tortilla bezglutenowa' },
            { qty: '2x', name: 'Lemoniada Rzemieślnicza', note: null },
        ],
        warning: null,
    },
    {
        id: '#1044', urgent: false, time: '00:02', type: 'Dostawa',
        items: [
            { qty: '3x', name: 'Kawa Czarna', note: 'Bez cukru' },
        ],
        warning: null,
    },
];

export default function Terminal() {
    const [activeTab, setActiveTab] = useState(0);
    const [doneOrders, setDoneOrders] = useState({});
    const scrollRef = useRef(null);

    const handleTabChange = (i) => {
        setActiveTab(i);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-[#1a202c] px-5 pt-12 pb-4">
                <div className="flex justify-between items-center animate-fade-in">
                    <button className="text-gray-400 p-1">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div className="text-center">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">LIVE TERMINAL</div>
                        <div className="text-base font-black text-white">GastroMiasto Fest</div>
                    </div>
                    <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                            GM
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white text-[9px] font-black">5</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs — horizontal swipeable pills */}
            <div className="bg-white border-b border-gray-100 px-4 flex gap-2 overflow-x-auto no-scrollbar py-3 snap-scroll">
                {TABS.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => handleTabChange(i)}
                        className={`snap-item flex-shrink-0 flex items-center gap-1.5 py-2 px-4 rounded-full font-bold text-sm transition-all duration-200 active:scale-95 ${activeTab === i
                                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {tab.label}
                        {tab.count !== null && (
                            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${activeTab === i ? 'bg-white/25 text-white' : 'bg-white text-gray-600'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Orders */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pt-4 flex flex-col gap-3 pb-6">
                {/* Section label */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500 text-lg">🔥</span>
                        <h2 className="text-sm font-black text-red-600 uppercase tracking-wider">Nowe Zamówienia</h2>
                    </div>
                    <span className="bg-red-50 text-red-500 border border-red-100 font-bold text-xs px-3 py-1 rounded-full">
                        {TABS[0].count} Oczekuje
                    </span>
                </div>

                {ORDERS.map((order, idx) => (
                    !doneOrders[order.id] && (
                        <OrderCard
                            key={order.id}
                            order={order}
                            delay={idx * 100}
                            onDone={() => setDoneOrders(d => ({ ...d, [order.id]: true }))}
                        />
                    )
                ))}
            </div>
        </div>
    );
}

function OrderCard({ order, delay, onDone }) {
    const [prepTime, setPrepTime] = useState(20);
    const [started, setStarted] = useState(false);
    const times = [10, 15, 20, 30, 45];

    return (
        <div
            className={`bg-white rounded-2xl overflow-hidden shadow-sm animate-order-pop card-hover ${order.urgent
                    ? 'border-2 border-orange-400 shadow-orange-100'
                    : started
                        ? 'border-2 border-green-400 shadow-green-100'
                        : 'border border-gray-100'
                }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="px-4 pt-4 pb-3">
                {/* Header */}
                <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xl font-black text-gray-900">{order.id}</span>
                        {order.urgent && (
                            <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide animate-pulse">
                                ⚡ Pilne
                            </span>
                        )}
                        {started && (
                            <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                                ✓ W toku
                            </span>
                        )}
                    </div>
                    <button className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                        <Printer size={15} className="text-gray-400" />
                    </button>
                </div>
                <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {order.time} min temu • {order.type}
                </p>

                {/* Items */}
                <div className="space-y-2 mb-3">
                    {order.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex gap-2 items-baseline">
                                <span className="text-gray-400 font-bold text-sm w-7 flex-shrink-0">{item.qty}</span>
                                <span className="font-bold text-gray-900">{item.name}</span>
                            </div>
                            {item.note && <p className="text-xs text-gray-400 ml-9 mt-0.5">{item.note}</p>}
                        </div>
                    ))}
                </div>

                {/* Allergy warning */}
                {order.warning && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5 flex items-center gap-2 mb-3">
                        <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
                        <span className="text-yellow-800 font-black text-xs uppercase tracking-wide">{order.warning}</span>
                    </div>
                )}

                {/* Prep time slider */}
                <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                        ⏱ Czas przygotowania (min)
                    </p>
                    <div className="flex gap-2">
                        {times.map((t) => (
                            <button
                                key={t}
                                onClick={() => setPrepTime(t)}
                                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all duration-200 active:scale-90 ${prepTime === t
                                        ? 'bg-orange-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4 flex gap-2">
                <button
                    onClick={() => { setStarted(true); setTimeout(onDone, 2500); }}
                    className={`flex-1 font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 text-sm ${started
                            ? 'bg-green-500 text-white shadow-md shadow-green-200 btn-glow-green'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-200'
                        }`}
                >
                    {started ? '✓ AKCEPTUJĘ — Gotowe za ' + prepTime + ' min' : 'AKCEPTUJ'}
                </button>
                <button className="w-12 h-12 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 active:scale-90 transition-all hover:bg-gray-50 flex-shrink-0">
                    <Phone size={17} />
                </button>
            </div>
        </div>
    );
}
