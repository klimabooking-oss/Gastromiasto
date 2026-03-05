import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User, LayoutDashboard } from 'lucide-react';

// 13 presentation slides from /public/slides/
const SLIDES = Array.from({ length: 13 }, (_, i) => ({
    id: i,
    src: `/slides/freepik__-presentationstyle-format-vertical-916-designlangu__${89544 + i}.png`,
}));

export default function Splash() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [animateIn, setAnimateIn] = useState(true);
    const trackRef = useRef(null);
    const autoRef = useRef(null);

    // Auto-advance slides
    useEffect(() => {
        if (!autoPlay || showRoleModal) return;
        autoRef.current = setInterval(() => {
            goTo((prev) => (prev + 1) % SLIDES.length);
        }, 3500);
        return () => clearInterval(autoRef.current);
    }, [autoPlay, current, showRoleModal]);

    const goTo = useCallback((indexOrFn) => {
        setAnimateIn(false);
        setTimeout(() => {
            setCurrent(typeof indexOrFn === 'function' ? indexOrFn : indexOrFn);
            setAnimateIn(true);
        }, 50);
    }, []);

    const prev = () => { setAutoPlay(false); goTo((c) => (c - 1 + SLIDES.length) % SLIDES.length); };
    const next = () => { setAutoPlay(false); goTo((c) => (c + 1) % SLIDES.length); };

    // Touch/pointer swipe handlers
    const onPointerDown = (e) => {
        setDragging(true);
        setDragStart(e.clientX ?? e.touches?.[0]?.clientX ?? 0);
        setDragOffset(0);
        setAutoPlay(false);
    };
    const onPointerMove = (e) => {
        if (!dragging) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        setDragOffset(x - dragStart);
    };
    const onPointerUp = () => {
        if (!dragging) return;
        setDragging(false);
        if (dragOffset < -60) next();
        else if (dragOffset > 60) prev();
        setDragOffset(0);
    };

    return (
        <div className="min-h-screen bg-[#0f1724] flex justify-center items-center">
            <div className="w-full max-w-md min-h-screen relative flex flex-col overflow-hidden select-none">

                {/* ─── SLIDESHOW ─────────────────────────────────────────── */}
                <div
                    ref={trackRef}
                    className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
                    onMouseDown={onPointerDown}
                    onMouseMove={onPointerMove}
                    onMouseUp={onPointerUp}
                    onMouseLeave={onPointerUp}
                    onTouchStart={onPointerDown}
                    onTouchMove={onPointerMove}
                    onTouchEnd={onPointerUp}
                >
                    {/* Slides */}
                    {SLIDES.map((slide, i) => {
                        const offset = (i - current) * 100 + (dragOffset / (trackRef.current?.offsetWidth || 390)) * 100;
                        const isActive = i === current;
                        const isAdjacent = Math.abs(i - current) === 1 || (current === 0 && i === SLIDES.length - 1) || (current === SLIDES.length - 1 && i === 0);
                        if (!isActive && !isAdjacent) return null;
                        return (
                            <div
                                key={slide.id}
                                className="absolute inset-0 transition-transform duration-300 ease-out"
                                style={{
                                    transform: `translateX(${offset}%)`,
                                    willChange: 'transform',
                                }}
                            >
                                <img
                                    src={slide.src}
                                    alt={`Slajd ${i + 1}`}
                                    className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-60'
                                        }`}
                                    draggable={false}
                                />
                                {/* Gradient overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />
                            </div>
                        );
                    })}

                    {/* Top bar: logo + slide counter */}
                    <div className="absolute top-0 left-0 right-0 px-5 pt-12 pb-4 flex justify-between items-center z-20 pointer-events-none">
                        <div className="text-2xl font-black text-white drop-shadow-lg">
                            Gastro<span className="text-orange-400">Miasto</span>
                        </div>
                        <div className="bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-bold">
                            {current + 1} / {SLIDES.length}
                        </div>
                    </div>

                    {/* Arrow nav — desktop */}
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all pointer-events-auto hidden sm:flex"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all pointer-events-auto hidden sm:flex"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Bottom controls overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-6 pointer-events-auto">
                        {/* Dot indicators */}
                        <div className="flex justify-center gap-1.5 mb-5">
                            {SLIDES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setAutoPlay(false); goTo(i); }}
                                    className={`rounded-full transition-all duration-300 ${i === current
                                            ? 'w-6 h-2 bg-orange-400'
                                            : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Role selection buttons */}
                        <div
                            className={`flex flex-col gap-3 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => navigate('/home')}
                                    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black py-4 rounded-2xl text-base shadow-xl shadow-orange-500/30 transition-all duration-200 btn-glow-orange"
                                >
                                    <User size={18} />
                                    Zamawiaj
                                </button>
                                <button
                                    onClick={() => navigate('/b2b')}
                                    className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md hover:bg-white/25 active:scale-95 border border-white/20 text-white font-black py-4 rounded-2xl text-base shadow-xl transition-all duration-200"
                                >
                                    <LayoutDashboard size={18} />
                                    Restaurant
                                </button>
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full text-white/50 text-xs font-medium text-center py-2 hover:text-white/80 transition-colors"
                            >
                                Mam już konto — zaloguj się →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
