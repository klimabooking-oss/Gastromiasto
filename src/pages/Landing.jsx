import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Truck, ChevronRight } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Hero Section */}
            <section
                className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 overflow-hidden"
                style={{
                    background: 'linear-gradient(160deg, #1a202c 0%, #2d3748 55%, #1a202c 100%)',
                    minHeight: '70vh',
                }}
            >
                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />
                </div>

                {/* Logo */}
                <div className="relative z-10 mb-8">
                    <div className="text-4xl font-black tracking-tight text-white">
                        Gastro<span className="text-orange-500">Miasto</span>
                    </div>
                </div>

                {/* Main headline */}
                <div className="relative z-10 mb-6">
                    <h1 className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tight">
                        Dowozimy!
                    </h1>
                    <p className="mt-4 text-xl sm:text-2xl text-gray-300 font-medium leading-relaxed">
                        Twoje miasto.<br />
                        <span className="text-orange-400 font-bold">0% prowizji.</span> Uczciwy koszyk.
                    </p>
                </div>

                {/* Sub */}
                <p className="relative z-10 text-gray-400 text-base max-w-xs mx-auto mb-10">
                    Restauracje płacą abonament. Ty nie płacisz prowizji. Rewolucja zaczyna się tutaj.
                </p>

                {/* CTAs */}
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-sm">
                    <Link
                        to="/home"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg transition-all duration-200 text-center"
                    >
                        Zamów teraz 🍕
                    </Link>
                    <Link
                        to="/login"
                        className="flex-1 border border-white/30 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold py-4 px-8 rounded-2xl text-base transition-all duration-200 text-center backdrop-blur-sm"
                    >
                        Dla restauracji
                    </Link>
                </div>

                {/* Social proof */}
                <div className="relative z-10 mt-10 flex items-center gap-6 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-semibold">4.9</span>
                        <span>/ 2,400+ opinii</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-orange-400" />
                        <span>Wrocław & inne</span>
                    </div>
                </div>

                {/* Wave bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 80" className="w-full h-16 block" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,74.7C672,75,768,53,864,48C960,43,1056,53,1152,56L1200,58.7L1200,80L0,80Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="flex-1 py-10 px-6 bg-white">
                <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Dlaczego my?</h2>

                    <div className="flex flex-col gap-4">
                        <FeatureCard
                            icon="💸"
                            iconBg="bg-orange-50"
                            title="0% Prowizji dla Klientów"
                            desc="Ceny 1:1 jak w lokalu. Koniec z ukrytymi opłatami i zawyżonym menu."
                        />
                        <FeatureCard
                            icon="✅"
                            iconBg="bg-green-50"
                            title="Transparentna Cena"
                            desc="Widzisz dokładnie co płacisz. Abonament restauracji = uczciwe ceny dla Ciebie."
                        />
                        <FeatureCard
                            icon="🛵"
                            iconBg="bg-blue-50"
                            title="Szybka Dostawa"
                            desc="Kurierzy bezpośrednio z restauracji. Lepsza jakość i krótsza droga."
                        />
                        <FeatureCard
                            icon="🤝"
                            iconBg="bg-purple-50"
                            title="Wspierasz lokalne"
                            desc="Każde zamówienie trafia bezpośrednio do kieszeni restauratora – bez pośredników."
                        />
                    </div>

                    {/* CTA bottom */}
                    <div className="mt-10 text-center">
                        <Link
                            to="/home"
                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-2xl text-lg shadow-md transition-all duration-200 active:scale-95"
                        >
                            Przeglądaj restauracje
                            <ChevronRight size={20} />
                        </Link>
                        <p className="mt-4 text-xs text-gray-400">Już ponad 120 restauracji w sieci</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, iconBg, title, desc }) {
    return (
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
