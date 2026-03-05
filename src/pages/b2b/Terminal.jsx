import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, ChefHat, PhoneCall } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Terminal() {
    const [activeTab, setActiveTab] = useState('nowe');

    const tabs = [
        { id: 'nowe', label: 'NOWE', count: 3 },
        { id: 'przygotowanie', label: 'W przygotowaniu', count: 5 },
        { id: 'gotowe', label: 'Gotowe', count: 2 },
    ];

    return (
        <div className="flex flex-col h-full fade-in">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-4">Terminal Zamówień</h1>

                {/* Status Tabs */}
                <div className="flex gap-2 border-b border-gray-200 pb-px">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "px-5 py-3 text-sm font-bold rounded-t-lg transition-colors relative flex items-center gap-2",
                                activeTab === tab.id
                                    ? "bg-white text-primary rounded-t-xl border-t border-l border-r border-gray-200 -mb-px z-10 shadow-sm"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-transparent"
                            )}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                                    activeTab === tab.id ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-700"
                                )}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Order Card 1 */}
                <OrderCard
                    id="#1042"
                    time="1 min temu"
                    items={["2x Burger Klasyk", "1x Frytki Duże"]}
                    total="86,00 zł"
                    warning="⚠️ BEZ CEBULI!"
                    customer="Kasia, 789 123 456"
                />

                {/* Order Card 2 */}
                <OrderCard
                    id="#1043"
                    time="4 min temu"
                    items={["1x Vege Szaleństwo", "1x Lemoniada"]}
                    total="47,00 zł"
                    customer="Piotr, 555 444 333"
                />

                {/* Order Card 3 */}
                <OrderCard
                    id="#1044"
                    time="6 min temu"
                    items={["3x Burger Drwala", "2x Krążki Cebulowe"]}
                    total="145,00 zł"
                    warning="⚠️ DODATKOWY SOS DO FRYTEK"
                    customer="Adam, 111 222 333"
                />
            </div>
        </div>
    );
}

function OrderCard({ id, time, items, warning, customer, total }) {
    const [prepTime, setPrepTime] = useState(15);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden transition-all hover:shadow-md">
            {/* Card Header */}
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="font-black text-lg text-primary">{id}</span>
                    <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded text-xs font-bold text-gray-600">
                        <Clock size={12} /> {time}
                    </span>
                </div>
                <span className="font-bold text-primary">{total}</span>
            </div>

            {/* Warning Box */}
            {warning && (
                <div className="bg-red-50 border-y border-red-100 px-5 py-2 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-600" />
                    <span className="text-red-700 font-bold text-sm tracking-wide">{warning}</span>
                </div>
            )}

            {/* Card Body (Items) */}
            <div className="p-5 flex-1 flex flex-col gap-2">
                {items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-primary font-medium text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                    </div>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-gray-500">
                    <PhoneCall size={14} /> {customer}
                </div>
            </div>

            {/* Actions */}
            <div className="p-5 bg-gray-50 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Czas przyg. (min)</label>
                <div className="flex gap-2 mb-4">
                    {[15, 20, 30].map(t => (
                        <button
                            key={t}
                            onClick={() => setPrepTime(t)}
                            className={cn(
                                "flex-1 py-1.5 rounded-lg text-sm font-bold border transition-colors",
                                prepTime === t
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <button className="w-full bg-success hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/20 transition-all flex justify-center items-center gap-2">
                    <ChefHat size={20} />
                    AKCEPTUJ
                </button>
            </div>
        </div>
    );
}
