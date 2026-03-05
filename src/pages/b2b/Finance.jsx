import React from 'react';
import { DollarSign, ArrowUpRight, TrendingUp, Download, Receipt, Star } from 'lucide-react';

export default function Finance() {
    const payouts = [
        { id: 1, date: 'Dzisiaj, 14:30', sales: '850.00', delivery: '25.00', tip: '45.00', net: '920.00' },
        { id: 2, date: 'Wczoraj, 22:15', sales: '2450.00', delivery: '110.00', tip: '135.00', net: '2695.00' },
        { id: 3, date: '21 Sie, 23:05', sales: '3100.00', delivery: '160.00', tip: '200.00', net: '3460.00' },
    ];

    return (
        <div className="flex flex-col h-full fade-in gap-6 pb-12">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Finanse i Wypłaty</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="bg-primary rounded-2xl p-8 shadow-xl text-white flex flex-col justify-between relative overflow-hidden h-64">
                    <div className="absolute right-0 top-0 opacity-5 transform translate-x-1/4 -translate-y-1/4">
                        <DollarSign size={200} />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-white/70 font-bold uppercase tracking-wider text-sm mb-2">Dostępne Środki</h3>
                        <div className="text-5xl font-black tracking-tight mb-2">18 450,00 zł</div>
                        <div className="flex items-center gap-1 text-success text-sm font-bold mt-1">
                            <TrendingUp size={16} /> +24% w tym tygodniu
                        </div>
                    </div>

                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center gap-2 relative z-10">
                        Wypłać Środki <ArrowUpRight size={20} />
                    </button>
                </div>

                {/* Savings Impact Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                            Zaoszczędzona Prowizja
                        </h2>
                        <span className="bg-success text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <Star size={12} /> W tym miesiącu
                        </span>
                    </div>

                    <div className="flex flex-col gap-6 mt-4">
                        {/* GastroMiasto Bar */}
                        <div>
                            <div className="flex justify-between font-bold mb-2 text-sm">
                                <span className="text-success flex items-center gap-1">🍃 GastroMiasto (0% Prowizji)</span>
                                <span className="text-success">11 400 PLN Zysku</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden">
                                <div className="bg-success h-full rounded-full transition-all duration-1000 w-[100%] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"></div>
                            </div>
                        </div>

                        {/* Standard Platform Bar */}
                        <div>
                            <div className="flex justify-between font-bold mb-2 text-sm opacity-60">
                                <span className="text-gray-500">Standardowa Platforma (30%)</span>
                                <span className="text-gray-500">7 980 PLN Zysku</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-4 relative overflow-hidden opacity-60">
                                <div className="bg-gray-400 h-full rounded-full transition-all duration-1000 w-[70%]"></div>
                            </div>
                        </div>

                        <p className="text-sm font-medium text-gray-500 mt-2 bg-gray-50 p-4 border border-gray-100 rounded-xl leading-snug">
                            Zatrzymujesz <span className="text-success font-bold">100%</span> zapłaconych pieniędzy przez klienta za jedzenie. Dodatkowo napiwki wpływają 1:1 na Twoje konto.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tables & Subscription */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Payouts */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-0 shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-primary">Ostatnie Wypłaty</h2>
                        <button className="text-sm font-bold text-orange-500 hover:underline">Historia operacji</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                                    <th className="p-4 py-3">Data</th>
                                    <th className="p-4 py-3">Sprzedaż</th>
                                    <th className="p-4 py-3">Dostawa</th>
                                    <th className="p-4 py-3">Napiwki (1:1)</th>
                                    <th className="p-4 py-3 text-right">Zysk Netto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payouts.map(p => (
                                    <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 font-bold text-sm text-primary whitespace-nowrap">{p.date}</td>
                                        <td className="p-4 text-sm text-gray-600 font-medium whitespace-nowrap">{p.sales} zł</td>
                                        <td className="p-4 text-sm text-gray-600 font-medium whitespace-nowrap">{p.delivery} zł</td>
                                        <td className="p-4 text-sm text-gray-600 font-medium whitespace-nowrap">{p.tip} zł</td>
                                        <td className="p-4 text-sm font-bold text-success text-right whitespace-nowrap">+{p.net} zł</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Subscription Box */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 bg-gradient-to-b from-white to-orange-50/30 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                                <Receipt size={24} />
                            </div>
                            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Aktywny Plan</span>
                        </div>

                        <h2 className="text-2xl font-black text-primary mb-1">Pakiet Pro</h2>
                        <div className="text-gray-500 font-bold mb-6">299 PLN <span className="text-sm font-medium">/ miesiąc</span></div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                <CheckCircle size={16} className="text-success" /> 0% Prowizji od sprzedaży
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                <CheckCircle size={16} className="text-success" /> Nielimitowane zamówienia
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                <CheckCircle size={16} className="text-success" /> Kurier GastroMiasto
                            </li>
                        </ul>
                    </div>

                    <button className="w-full bg-white border border-gray-200 hover:border-orange-200 text-primary hover:text-orange-500 font-bold py-3.5 rounded-xl shadow-sm transition-all flex justify-center items-center gap-2">
                        <Download size={18} /> Pobierz fakturę
                    </button>
                </div>
            </div>
        </div>
    );
}
