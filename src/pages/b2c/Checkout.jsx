import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MapPin, CreditCard, ChevronRight, Clock } from 'lucide-react';

export default function Checkout() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Header */}
            <header className="px-5 pt-12 pb-4 bg-white sticky top-0 z-10 shadow-sm flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-primary">Kasa</h1>
            </header>

            <div className="p-5 flex-1 flex flex-col gap-5 overflow-y-auto pb-32">
                {/* Transparency Banner */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex gap-3 shadow-sm">
                    <CheckCircle className="text-success mt-1 flex-shrink-0" size={24} />
                    <div>
                        <h3 className="text-success font-bold text-base mb-1">Uczciwa cena. Bez ukrytych opłat.</h3>
                        <p className="text-green-800 text-sm leading-snug font-medium">To co widzisz, to co płacisz. GastroMiasto nie pobiera prowizji ukrytych w cenach dań.</p>
                    </div>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-lg text-primary border-b border-gray-100 pb-3 mb-4">Twoje zamówienie</h2>

                    <div className="flex flex-col gap-4 mb-4">
                        <div className="flex justify-between items-start font-medium items-center">
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-md bg-gray-100 text-primary flex items-center justify-center text-xs font-bold">1</span>
                                <span className="text-primary text-sm">Burger Drwala</span>
                            </div>
                            <span className="text-sm font-bold">35,00 PLN</span>
                        </div>
                        <div className="flex justify-between items-start font-medium items-center">
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-md bg-gray-100 text-primary flex items-center justify-center text-xs font-bold">2</span>
                                <span className="text-primary text-sm">Frytki z Batatów</span>
                            </div>
                            <span className="text-sm font-bold">32,00 PLN</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-gray-600 font-medium">
                            <span>Jedzenie</span>
                            <span>67,00 PLN</span>
                        </div>
                        <div className="flex justify-between text-gray-600 font-medium">
                            <span>Dostawa</span>
                            <span>9,00 PLN</span>
                        </div>
                        <div className="flex justify-between font-bold text-orange-500 bg-orange-50 p-2 rounded-lg -mx-2 px-2 mt-1">
                            <span>Opłata serwisowa</span>
                            <span>0,00 PLN</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-primary">Dostawa</h2>
                        <button className="text-orange-500 text-sm font-bold">Zmień</button>
                    </div>

                    <div className="flex items-center gap-4 mb-5 text-sm font-medium text-primary">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                            <MapPin size={20} className="text-orange-500" />
                        </div>
                        <div>
                            <p className="font-bold">Rynek 12, Wrocaw</p>
                            <p className="text-gray-500 text-xs mt-0.5">Dodaj notatkę dla kuriera</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <Clock size={18} className="text-gray-400" />
                            <span>Jak najszybciej (25-35 min)</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </div>
                </div>

                {/* Payment Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-primary">Metoda płatności</h2>
                        <button className="text-orange-500 text-sm font-bold">Zmień</button>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-12 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                            {/* Substitute for Apple Pay Logo */}
                            <span className="text-[10px] font-bold">Pay</span>
                        </div>
                        <span className="font-bold">Apple Pay</span>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="fixed sm:absolute bottom-0 w-full sm:w-full max-w-md bg-white border-t border-gray-100 p-4 pb-safe z-50">
                <div className="flex justify-between items-end mb-3 px-2">
                    <span className="text-sm font-bold text-gray-500">Do zapłaty</span>
                    <span className="text-2xl font-black text-primary">76,00 PLN</span>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center gap-2">
                    Zapłać i Zamów <ArrowLeft className="rotate-180" size={20} />
                </button>
            </div>
        </div>
    );
}
