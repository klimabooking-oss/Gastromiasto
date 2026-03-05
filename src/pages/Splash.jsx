import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChefHat, Presentation, ChevronRight } from 'lucide-react';

export default function Splash() {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

    return (
        <div
            className="min-h-screen flex justify-center items-center"
            style={{ background: 'linear-gradient(160deg, #0f1724 0%, #1a2235 55%, #1e2a3a 100%)' }}
        >
            <div className="w-full max-w-md min-h-screen flex flex-col px-6 pt-20 pb-10 relative overflow-hidden">

                {/* Background glow blobs */}
                <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[120px] left-[-60px] w-56 h-56 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />

                {/* Logo + Headline */}
                <div className="flex-1 flex flex-col justify-center">
                    <div
                        className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
                    >
                        <h1 className="text-6xl font-black text-white leading-none tracking-tight mb-1">
                            GastroMiasto<span className="text-orange-500">.</span>
                        </h1>
                        <p className="text-2xl font-black text-orange-500 tracking-wide mb-10">Dowozimy!</p>
                    </div>

                    {/* Role Buttons */}
                    <div
                        className={`flex flex-col gap-4 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        {/* Klient B2C */}
                        <RoleButton
                            icon={<ShoppingBag size={22} />}
                            iconBg="bg-orange-500"
                            cardBg="bg-white"
                            sub="Loguję jako"
                            label="Klient (B2C)"
                            labelColor="text-gray-900"
                            subColor="text-gray-500"
                            arrowColor="text-gray-400"
                            onClick={() => navigate('/home')}
                        />

                        {/* Restauracja B2B */}
                        <RoleButton
                            icon={<ChefHat size={22} />}
                            iconBg="bg-[#2d3a4f]"
                            cardBg="bg-[#212d40]"
                            sub="Loguję jako"
                            label="Restauracja (B2B)"
                            labelColor="text-white"
                            subColor="text-gray-400"
                            arrowColor="text-gray-500"
                            onClick={() => navigate('/b2b')}
                        />

                        {/* Prezentacja */}
                        <RoleButton
                            icon={<span className="text-xl">📊</span>}
                            iconBg="bg-[#2a3a2a]"
                            cardBg="bg-[#1e2f1e]"
                            sub="Zobacz"
                            label="Prezentacja"
                            labelColor="text-green-400"
                            subColor="text-gray-400"
                            arrowColor="text-gray-500"
                            onClick={() => navigate('/presentation')}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div
                    className={`text-center transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                >
                    <p className="text-xs text-gray-600">© 2026 GastroMiasto. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </div>
    );
}

function RoleButton({ icon, iconBg, cardBg, sub, label, labelColor, subColor, arrowColor, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full ${cardBg} rounded-2xl px-5 py-4 flex items-center gap-4 active:scale-[0.97] transition-all duration-200 shadow-lg`}
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
        >
            <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}>
                {icon}
            </div>
            <div className="flex-1 text-left">
                <p className={`text-xs font-semibold ${subColor} mb-0.5`}>{sub}</p>
                <p className={`text-lg font-black ${labelColor}`}>{label}</p>
            </div>
            <ChevronRight size={20} className={arrowColor} />
        </button>
    );
}
