import React, { useState } from 'react';
import { TrendingUp, TrendingDown, PiggyBank, Building2, CreditCard, ChevronDown, ChevronUp, Download } from 'lucide-react';

const transactions = [
    { id: '#4829', type: 'order', label: 'Zamówienie #8892', sub: 'Dzisiaj, 14:30', amount: '+45,50', positive: true },
    { id: '#payout', type: 'bank', label: 'Przelew bankowy', sub: 'Wczoraj', amount: '-1 200,00', positive: false },
    { id: '#4821', type: 'order', label: 'Zamówienie #8891', sub: 'Wczoraj, 19:15', amount: '+112,00', positive: true },
];

const payouts = [
    { date: 'Paź 24, 2023', total: '8 450,00 PLN', gross: '8 000 PLN', delivery: '250 PLN', tips: '200 PLN' },
    { date: 'Paź 17, 2023', total: '7 920,50 PLN', gross: '7 500 PLN', delivery: '230 PLN', tips: '190,50 PLN' },
    { date: 'Paź 10, 2023', total: '8 209,50 PLN', gross: '7 800 PLN', delivery: '210 PLN', tips: '199,50 PLN' },
];

export default function Finance() {
    const [openPayout, setOpenPayout] = useState(null);

    return (
        <div className="min-h-full bg-gray-50 pb-6">
            {/* Balance Card */}
            <div className="bg-[#1a202c] px-5 pt-12 pb-8">
                <h1 className="text-white text-lg font-bold mb-5">Finansieje</h1>
                <div className="bg-[#252d3d] rounded-2xl p-5">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Dostępne środki</p>
                    <p className="text-4xl font-black text-white mb-4">12 450,00 <span className="text-2xl">zł</span></p>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                        <Building2 size={18} /> Wypłać środki
                    </button>
                </div>
            </div>

            <div className="px-5 pt-5 flex flex-col gap-4">
                {/* Savings Impact */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-black text-gray-900">Oszczędności</h2>
                        <button className="text-xs text-gray-400 flex items-center gap-1">Ten miesiąc <ChevronDown size={14} /></button>
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Zaoszczędzona prowizja</p>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-black text-green-500">+3 420 zł</span>
                        <span className="text-xs text-gray-400">vs. platformy 30%</span>
                    </div>
                    <div className="mt-4 space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-semibold text-gray-900">GastroMiasto (0% prow.)</span>
                                <span className="font-bold">11 400 zł</span>
                            </div>
                            <div className="h-2.5 bg-green-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Platforma 30%</span>
                                <span className="text-gray-500">7 980 zł</span>
                            </div>
                            <div className="h-2.5 bg-red-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: '70%', background: 'repeating-linear-gradient(45deg, #fca5a5, #fca5a5 4px, #fee2e2 4px, #fee2e2 8px)' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cashflow */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-black text-gray-900 mb-4">Cashflow</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-xl p-4 text-center">
                            <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mb-1">
                                <TrendingUp size={12} className="text-green-500" /> Przychód
                            </p>
                            <p className="text-xl font-black text-gray-900">2 150,50 zł</p>
                            <p className="text-xs text-green-500 font-bold mt-1">↑ 12% dziś</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-4 text-center">
                            <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mb-1">
                                <TrendingDown size={12} className="text-red-500" /> Wypłaty
                            </p>
                            <p className="text-xl font-black text-gray-900">340,00 zł</p>
                            <p className="text-xs text-gray-400 mt-1">Zwroty & opłaty</p>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-black text-gray-900">Ostatnie transakcje</h2>
                        <button className="text-orange-500 text-sm font-semibold">Zobacz wszystkie</button>
                    </div>
                    <div className="flex flex-col divide-y divide-gray-50">
                        {transactions.map((t) => (
                            <div key={t.id} className="flex items-center gap-3 py-3.5">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.type === 'bank' ? 'bg-blue-100' : 'bg-orange-100'}`}>
                                    {t.type === 'bank' ? <Building2 size={18} className="text-blue-600" /> : <span className="text-lg">🍴</span>}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm text-gray-900">{t.label}</p>
                                    <p className="text-xs text-gray-400">{t.sub}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className={`font-black text-base ${t.positive ? 'text-green-500' : 'text-gray-600'}`}>
                                        {t.amount} zł
                                    </span>
                                    <ChevronDown size={16} className="text-gray-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Payouts */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="font-black text-gray-900">Przychód Netto</h2>
                        <span className="text-xs bg-green-100 text-green-600 font-bold px-2 py-1 rounded-full">0% Prowizja</span>
                    </div>
                    <p className="text-3xl font-black text-gray-900 mb-1">24 580,00 <span className="text-xl">PLN</span></p>
                    <p className="text-xs text-gray-400 mb-5">ⓘ 100% zarobków minus stała opłata SaaS.</p>

                    <h3 className="font-bold text-gray-700 mb-3">Ostatnie wypłaty</h3>
                    <div className="flex flex-col gap-2">
                        {payouts.map((p, i) => (
                            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setOpenPayout(openPayout === i ? null : i)}
                                    className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-sm text-gray-900">{p.date}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500 font-black text-base">{p.total}</span>
                                        {openPayout === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                    </div>
                                </button>
                                {openPayout === i && (
                                    <div className="px-4 pb-3 text-xs text-gray-500 space-y-1 border-t border-gray-50">
                                        <div className="flex justify-between pt-2"><span>Sprzedaż brutto</span><span>{p.gross}</span></div>
                                        <div className="flex justify-between"><span>Dostawa (1:1)</span><span>{p.delivery}</span></div>
                                        <div className="flex justify-between"><span>Napiwki (1:1)</span><span>{p.tips}</span></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 w-full border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        Zobacz całą historię
                    </button>
                </div>

                {/* Subscription */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-green-500 text-xl">✅</span>
                        <h2 className="font-black text-gray-900">Stały Abonament</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-gray-900">Plan Pro</p>
                            <p className="text-xs text-gray-400">Aktywny do 1 Lis 2023</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-gray-900">299 PLN</p>
                            <p className="text-xs text-gray-400">/ miesiąc</p>
                        </div>
                    </div>
                    <button className="mt-4 w-full border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Download size={16} /> Pobierz ostatnią fakturę
                    </button>
                </div>
            </div>
        </div>
    );
}
