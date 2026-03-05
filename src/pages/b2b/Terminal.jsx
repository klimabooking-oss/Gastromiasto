import React, { useState } from 'react';
import { Bell, Printer, Phone, AlertTriangle } from 'lucide-react';

const TABS = ['Nowe (5)', 'W przygotowaniu (12)', 'Gotowe (3)', 'Odebrane'];

const ORDERS = [
    {
        id: '#1042',
        urgent: true,
        time: '02:45 min temu',
        type: 'Dostawa',
        items: [
            { qty: '2x', name: 'Gastro Burger Combo', note: 'Medium rare, Extra cheese' },
            { qty: '1x', name: 'Słodkie Frytki z Batata', note: 'Majonez czosnkowy osobno' },
        ],
        warning: '🚨 BEZ CEBULI – CIĘŻKA ALERGIA',
    },
    {
        id: '#1043',
        urgent: false,
        time: '00:15 min temu',
        type: 'Odbiór',
        items: [
            { qty: '1x', name: 'Wrap Vege', note: 'Tortilla bezglutenowa' },
            { qty: '2x', name: 'Lemoniada Rzemieślnicza', note: null },
        ],
        warning: null,
    },
];

export default function Terminal() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="min-h-full bg-gray-50">
            {/* Header */}
            <header className="bg-[#1a202c] px-5 pt-12 pb-5">
                <div className="flex justify-between items-center">
                    <button className="text-gray-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div className="text-center">
                        <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest">LIVE TERMINAL</div>
                        <div className="text-base font-black text-white">GastroMiasto Fest</div>
                    </div>
                    <div className="relative">
                        <Bell size={22} className="text-white" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[9px] font-bold">5</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-white border-b border-gray-100">
                {TABS.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`flex-shrink-0 py-2 px-4 rounded-full font-bold text-sm transition-all ${activeTab === i
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Order Cards */}
            <div className="px-4 pt-4 flex flex-col gap-4 pb-6">
                {/* Section Title */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500">🔥</span>
                        <h2 className="text-base font-black text-red-600 uppercase tracking-wider">NOWE ZAMÓWIENIA</h2>
                    </div>
                    <span className="bg-red-100 text-red-600 font-bold text-xs px-3 py-1.5 rounded-full">5 OCZEKUJE</span>
                </div>

                {ORDERS.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}

function OrderCard({ order }) {
    const [time, setTime] = useState(20);

    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm ${order.urgent ? 'border-2 border-orange-500' : 'border border-gray-100'}`}>
            <div className="px-4 pt-4 pb-3">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-gray-900">{order.id}</span>
                        {order.urgent && (
                            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase">Pilne</span>
                        )}
                    </div>
                    <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Printer size={16} className="text-gray-500" />
                    </button>
                </div>
                <p className="text-xs text-gray-400 mb-3">{order.time} • {order.type}</p>

                <div className="space-y-2 mb-3">
                    {order.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex gap-2 items-baseline">
                                <span className="text-gray-400 font-bold text-sm w-7 flex-shrink-0">{item.qty}</span>
                                <span className="font-bold text-gray-900 text-base">{item.name}</span>
                            </div>
                            {item.note && <p className="text-xs text-gray-400 ml-9">{item.note}</p>}
                        </div>
                    ))}
                </div>

                {order.warning && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5 flex items-center gap-2 mb-3">
                        <AlertTriangle size={16} className="text-yellow-600 flex-shrink-0" />
                        <span className="text-yellow-700 font-black text-sm uppercase">{order.warning}</span>
                    </div>
                )}
            </div>

            <div className="px-4 pb-4 flex gap-2">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95">
                    ▶ START
                </button>
                <button className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 flex-shrink-0">
                    <Phone size={18} />
                </button>
            </div>
        </div>
    );
}
