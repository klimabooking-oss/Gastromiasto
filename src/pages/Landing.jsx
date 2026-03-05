import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ChevronRight, TrendingDown, Shield, Bike, Heart } from 'lucide-react';

const STATS = [
    { value: '120+', label: 'Restauracji' },
    { value: '0%', label: 'Prowizji' },
    { value: '4.9★', label: 'Ocena app' },
];

const FEATURES = [
    { icon: '💸', iconBg: 'bg-orange-50', title: '0% Prowizji dla Klientów', desc: 'Ceny 1:1 jak w lokalu. Koniec z ukrytymi opłatami i zawyżonym menu.' },
    { icon: '✅', iconBg: 'bg-green-50', title: 'Transparentna Cena', desc: 'Widzisz dokładnie co płacisz. Abonament restauracji = uczciwe ceny dla Ciebie.' },
    { icon: '🛵', iconBg: 'bg-blue-50', title: 'Szybka Dostawa', desc: 'Kurierzy bezpośrednio z restauracji. Lepsza jakość i krótsza droga.' },
    { icon: '🤝', iconBg: 'bg-purple-50', title: 'Wspierasz lokalne', desc: 'Każde zamówienie trafia bezpośrednio do kieszeni restauratora.' },
];

export default function Landing() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
            {/* Hero */}
            <section
                className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-28 overflow-hidden"
                style={{
                    background: 'linear-gradient(150deg, #0f1724 0%, #1a202c 40%, #2d3748 80%, #1e3a2f 100%)',
                    minHeight: '75vh',
                }}
            >
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                {/* Logo */}
                <div className={`relative z-10 mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="text-3xl font-black tracking-tight text-white">
                        Gastro<span className="text-orange-400">Miasto</span>
                    </div>
                </div>

                {/* Main headline */}
                <div className={`relative z-10 mb-5 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <h1 className="text-6xl sm:text-7xl font-black text-white leading-none tracking-tight">
                        Dowozimy!
                    </h1>
                    <p className="mt-4 text-xl sm:text-2xl text-gray-300 font-medium leading-relaxed">
                        Twoje miasto.<br />
                        <span className="text-orange-400 font-black">0% prowizji.</span> Uczciwy koszyk.
                    </p>
                </div>

                {/* Sub */}
                <p className={`relative z-10 text-gray-400 text-sm max-w-xs mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    Restauracje płacą stały abonament.<br />Ty nie płacisz prowizji. Rewolucja zaczyna się tutaj.
                </p>

                {/* CTAs */}
                <div className={`relative z-10 flex flex-col sm:flex-row gap-3 w-full max-w-xs transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <Link
                        to="/home"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black py-4 px-6 rounded-2xl text-lg shadow-xl transition-all duration-200 text-center btn-glow-orange"
                    >
                        Zamów teraz 🍕
                    </Link>
                    <Link
                        to="/login"
                        className="flex-1 border border-white/20 bg-white/8 hover:bg-white/15 active:scale-95 text-white font-semibold py-4 px-6 rounded-2xl text-base transition-all duration-200 text-center backdrop-blur-sm"
                    >
                        Dla Restauracji
                    </Link>
                </div>

                {/* Stats row */}
                <div className={`relative z-10 mt-10 flex gap-6 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {STATS.map((s, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="text-white font-black text-lg">{s.value}</span>
                            <span className="text-gray-500 text-xs font-medium">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
                    <svg viewBox="0 0 1440 80" className="w-full h-16 block" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,60 C360,100 1080,20 1440,60 L1440,80 L0,80 Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Features */}
            <section className="flex-1 py-10 px-5 bg-white">
                <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Dlaczego GastroMiasto?</h2>
                    <p className="text-center text-sm text-gray-400 mb-8">Jedyna platforma, która dba o Ciebie i restauratora jednocześnie.</p>

                    <div className="flex flex-col gap-3">
                        {FEATURES.map((f, i) => (
                            <FeatureCard key={i} {...f} delay={i * 100} />
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-400 font-medium">Dołącz teraz</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* CTA bottom */}
                    <div className="text-center">
                        <Link
                            to="/home"
                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black py-4 px-10 rounded-2xl text-lg shadow-lg transition-all duration-200"
                        >
                            Przeglądaj restauracje
                            <ChevronRight size={20} />
                        </Link>
                        <p className="mt-4 text-xs text-gray-400">Już ponad 120 restauracji w sieci · Wrocław i okolice</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, iconBg, title, desc, delay }) {
    const [visible, setVisible] = useState(false);
    const ref = React.useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm card-hover transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-900 mb-0.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
