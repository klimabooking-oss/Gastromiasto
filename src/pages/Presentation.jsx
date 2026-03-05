import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SLIDES = Array.from({ length: 13 }, (_, i) => ({
    id: i,
    src: `/slides/freepik__-presentationstyle-format-vertical-916-designlangu__${89544 + i}.png`,
}));

export default function Presentation() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [animDir, setAnimDir] = useState(null); // 'left' | 'right' | null
    const [dragStart, setDragStart] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const autoRef = useRef(null);

    const goTo = useCallback((nextIndex, dir) => {
        if (nextIndex === current) return;
        setAnimDir(dir);
        setCurrent(nextIndex);
        clearInterval(autoRef.current);
        setTimeout(() => setAnimDir(null), 350);
    }, [current]);

    const goNext = useCallback(() => goTo((current + 1) % SLIDES.length, 'left'), [current, goTo]);
    const goPrev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, 'right'), [current, goTo]);

    useEffect(() => {
        autoRef.current = setInterval(goNext, 4500);
        return () => clearInterval(autoRef.current);
    }, [goNext]);

    const onPointerDown = (e) => {
        setDragging(true);
        setDragStart(e.clientX ?? e.touches?.[0]?.clientX ?? 0);
        setDragOffset(0);
        clearInterval(autoRef.current);
    };
    const onPointerMove = (e) => {
        if (!dragging || dragStart === null) return;
        setDragOffset((e.clientX ?? e.touches?.[0]?.clientX ?? 0) - dragStart);
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
            className="min-h-screen flex justify-center"
            style={{ background: '#0b1220' }}
        >
            <div className="w-full max-w-md min-h-screen flex flex-col relative">

                {/* Close button — top right only, no navbar */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-12 right-5 z-30 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all"
                >
                    <X size={18} />
                </button>

                {/* Slide area — full height minus bottom bar */}
                <div
                    className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none relative"
                    onMouseDown={onPointerDown}
                    onMouseMove={onPointerMove}
                    onMouseUp={onPointerUp}
                    onMouseLeave={onPointerUp}
                    onTouchStart={onPointerDown}
                    onTouchMove={onPointerMove}
                    onTouchEnd={onPointerUp}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            key={current}
                            src={SLIDES[current].src}
                            alt={`Slajd ${current + 1}`}
                            draggable={false}
                            className="w-full h-full"
                            style={{
                                objectFit: 'contain',
                                transform: `translateX(${dragging ? dragOffset * 0.08 : 0}px)`,
                                transition: dragging ? 'none' : 'transform 0.3s ease',
                                animation: animDir
                                    ? `${animDir === 'left' ? 'slideEnterLeft' : 'slideEnterRight'} 0.4s cubic-bezier(0.22,1,0.36,1) forwards`
                                    : 'slideFloat 6s ease-in-out infinite',
                            }}
                        />
                    </div>

                    {/* Animated orange accent bar — top */}
                    <div
                        key={`bar-${current}`}
                        className="absolute top-0 left-0 h-[3px] pointer-events-none"
                        style={{ animation: 'accentExpand 0.6s cubic-bezier(0.22,1,0.36,1) forwards', right: 0 }}
                    >
                        <div className="h-full w-full bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />
                    </div>

                    {/* Pulsing corner glow */}
                    <div
                        key={`glow-${current}`}
                        className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at bottom right, rgba(249,115,22,0.15) 0%, transparent 70%)',
                            animation: 'glowPulse 3s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* Bottom bar — arrows + counter only, no dots */}
                <div
                    className="flex-shrink-0 flex items-center justify-between px-8 py-5"
                    style={{ background: 'linear-gradient(to top, #0b1220 80%, transparent)' }}
                >
                    {/* Prev arrow */}
                    <button
                        onClick={goPrev}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Counter */}
                    <span className="text-white/50 text-sm font-bold tabular-nums">
                        {current + 1} <span className="text-white/25">/ {SLIDES.length}</span>
                    </span>

                    {/* Next arrow */}
                    <button
                        onClick={goNext}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes slideEnterLeft {
          from { opacity: 0.3; transform: scale(0.88) translateX(8%); }
          to   { opacity: 1;   transform: scale(0.9) translateX(0); }
        }
        @keyframes slideEnterRight {
          from { opacity: 0.3; transform: scale(0.88) translateX(-8%); }
          to   { opacity: 1;   transform: scale(0.9) translateX(0); }
        }
        @keyframes slideFloat {
          0%, 100% { transform: scale(0.9) translateY(0px); }
          50%       { transform: scale(0.9) translateY(-6px); }
        }
        @keyframes accentExpand {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to   { opacity: 1; transform: scaleX(1); transform-origin: left; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
      `}</style>
        </div>
    );
}
