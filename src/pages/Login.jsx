import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-primary flex flex-col justify-center items-center text-white px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>

            <div className="z-10 w-full max-w-md flex flex-col items-center">

                {/* Main Branding Header */}
                <div className="text-center mb-16 fade-in">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2">
                        GastroMiasto<span className="text-orange-500">.</span>
                    </h1>
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        Dowozimy!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex flex-col gap-4 fade-in" style={{ animationDelay: '0.1s' }}>

                    <button
                        onClick={() => navigate('/')}
                        className="group w-full bg-white hover:bg-gray-50 text-primary font-bold text-lg py-5 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-between border-2 border-transparent hover:border-orange-500"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                                <ShoppingBag size={24} />
                            </div>
                            <div className="text-left">
                                <p className="leading-tight">Loguję jako</p>
                                <p className="text-xl font-black">Klient (B2C)</p>
                            </div>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </button>

                    <button
                        onClick={() => navigate('/b2b')}
                        className="group w-full bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg py-5 px-6 rounded-2xl shadow-xl transition-all flex items-center justify-between border-2 border-gray-700 hover:border-success"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-700 group-hover:bg-green-900/50 rounded-xl flex items-center justify-center text-success transition-colors">
                                <ChefHat size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-gray-400 leading-tight">Loguję jako</p>
                                <p className="text-xl font-black">Restauracja (B2B)</p>
                            </div>
                        </div>
                        <ArrowRight className="text-gray-500 group-hover:text-success transition-colors" />
                    </button>

                </div>

                <p className="mt-12 text-sm text-gray-500 font-medium fade-in" style={{ animationDelay: '0.2s' }}>
                    © 2026 GastroMiasto. Wszelkie prawa zastrzeżone.
                </p>

            </div>
        </div>
    );
}
