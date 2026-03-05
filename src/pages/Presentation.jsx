import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SLIDES = Array.from({ length: 13 }, (_, i) => ({
    id: i,
    src: `/slides/freepik__-presentationstyle-format-vertical-916-designlangu__${89544 + i}.png`,
    title: `Slajd ${i + 1} z 13`,
}));

export default function Presentation() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left
    const [animating, setAnimating] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef(null);
    const autoRef = useRef(null);

    const goTo = useCallback((nextIndex, dir) => {
        if (animating || nextIndex === current) return;
        setDirection(dir);
        setPrev(current);
        setAnimating(true);
        setCurrent(nextIndex);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 400);
        clearInterval(autoRef.current);
    }, [animating, current]);

    const goNext = useCallback(() => goTo((current + 1) % SLIDES.length, 1), [current, goTo]);
    const goPrev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1), [current, goTo]);

    // Auto-advance
    useEffect(() => {
        autoRef.current = setInterval(goNext, 4000);
        return () => clearInterval(autoRef.current);
    }, [goNext]);

    // Touch/mouse swipe
    const onPointerDown = (e) => {
        setDragging(true);
        setDragStart(e.clientX ?? e.touches?.[0]?.clientX ?? 0);
        setDragOffset(0);
        clearInterval(autoRef.current);
    };
    const onPointerMove = (e) => {
        if (!dragging || dragStart === null) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        setDragOffset(x - dragStart);
    };
    const onPointerUp = () => {
        if (!dragging) return;
        setDragging(false);
        if (dragOffset < -60) goNext();
        else if (dragOffset > 60) goPrev();
        setDragOffset(0);
        setDragStart(null);
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0f1724 0%, #1a2235 55%, #1e2a3a 100%)' }}
        >
            <div className="w-full max-w-md min-h-screen flex flex-col relative">

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-12 pb-4 flex justify-between items-center">
                    <div className="text-xl font-black text-white drop-shadow-lg">
                        Gastro<span className="text-orange-500">Miasto</span>
                        <span className="text-xs text-gray-400 font-normal ml-2">/ Prezentacja</span>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Slideshow */}
                <div
                    ref={containerRef}
                    className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={onPointerDown}
                    onMouseMove={onPointerMove}
                    onMouseUp={onPointerUp}
                    onMouseLeave={onPointerUp}
                    onTouchStart={onPointerDown}
                    onTouchMove={onPointerMove}
                    onTouchEnd={onPointerUp}
                >
                    {/* Render current + prev for smooth transition */}
                    {SLIDES.map((slide, i) => {
                        const isCurrent = i === current;
                        const isPrev = i === prev;
                        if (!isCurrent && !isPrev) return null;

                        let xOffset = '0%';
                        if (animating) {
                            if (isCurrent) xOffset = '0%';
                            if (isPrev) xOffset = direction === 1 ? '-100%' : '100%';
                        } else if (!animating && isCurrent) {
                            xOffset = '0%';
                        }

                        const enterFrom = direction === 1 ? '100%' : '-100%';

                        return (
                            <div
                                key={slide.id}
                                className="absolute inset-0"
                                style={{
                                    transform: `translateX(${dragOffset}px) translateX(${animating && isCurrent ? '0' : ''})`,
                                    animation: animating && isCurrent
                                        ? `slideIn${direction === 1 ? 'FromRight' : 'FromLeft'} 0.4s cubic-bezier(0.22,1,0.36,1) forwards`
                                        : animating && isPrev
                                            ? `slideOut${direction === 1 ? 'ToLeft' : 'ToRight'} 0.4s cubic-bezier(0.22,1,0.36,1) forwards`
                                            : isCurrent ? 'none' : 'none',
                                    zIndex: isCurrent ? 2 : 1,
                                }}
                            >
                                {/* Image with app-style overlay */}
                                <div className="w-full h-full relative">
                                    <img
                                        src={slide.src}
                                        alt={slide.title}
                                        className="w-full h-full object-contain"
                                        draggable={false}
                                        style={{ background: '#0f1724' }}
                                    />

                                    {/* App-style tint overlay to unify color scheme */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(to bottom, rgba(15,23,36,0.15) 0%, rgba(15,23,36,0) 30%, rgba(15,23,36,0) 65%, rgba(15,23,36,0.7) 100%)',
                                            mixBlendMode: 'multiply',
                                        }}
                                    />
                                    {/* Orange accent line at top */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        );
                    })}

                    {/* Swipe hint (first slide only, fades) */}
                    {current === 0 && (
                        <div className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-none z-20 animate-fade-in">
                            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-white/70 text-xs">← Przesuń aby nawigować →</span>
                            </div>
                        </div>
                    )}

                    {/* Arrow nav — desktop */}
                    <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 active:scale-90 transition-all hidden sm:flex">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 active:scale-90 transition-all hidden sm:flex">
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Bottom bar */}
                <div
                    className="relative z-30 px-5 py-4 flex flex-col items-center gap-3"
                    style={{ background: 'linear-gradient(to top, #0f1724 80%, transparent)' }}
                >
                    {/* Dot indicators */}
                    <div className="flex gap-1.5 flex-wrap justify-center">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i, i > current ? 1 : -1)}
                                className={`rounded-full transition-all duration-300 ${i === current
                                        ? 'w-6 h-2.5 bg-orange-500'
                                        : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Slide counter + nav mini */}
                    <div className="flex items-center gap-6">
                        <button onClick={goPrev} className="text-white/50 hover:text-white transition-colors p-2">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-white/60 text-sm font-bold tabular-nums">
                            {current + 1} <span className="text-white/30">/ {SLIDES.length}</span>
                        </span>
                        <button onClick={goNext} className="text-white/50 hover:text-white transition-colors p-2">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide transition keyframes inline */}
            <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0.6; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); opacity: 0.6; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideOutToLeft {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0.6; }
        }
        @keyframes slideOutToRight {
          from { transform: translateX(0);   opacity: 1; }
          to   { transform: translateX(100%); opacity: 0.6; }
        }
      `}</style>
        </div>
    );
}
