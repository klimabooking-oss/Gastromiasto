import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, MapPin, BarChart2, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function B2BLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center">
            <div className="w-full max-w-md bg-gray-50 min-h-screen shadow-xl relative flex flex-col">
                <div className="flex-1 overflow-y-auto pb-20">
                    <Outlet />
                </div>

                {/* Bottom Navigation */}
                <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center py-3 pb-safe z-50">
                    <B2BNavItem to="/b2b" icon={<LayoutDashboard size={22} />} label="Pulpit" exact />
                    <B2BNavItem to="/b2b/terminal" icon={<ClipboardList size={22} />} label="Zamówienia" badge="5" />
                    <B2BNavItem to="/b2b/menu-editor" icon={<UtensilsCrossed size={22} />} label="Menu" />
                    <B2BNavItem to="/b2b/zones" icon={<MapPin size={22} />} label="Strefy" />
                    <B2BNavItem to="/b2b/finance" icon={<BarChart2 size={22} />} label="Finanse" />
                </nav>
            </div>
        </div>
    );
}

function B2BNavItem({ to, icon, label, badge, exact }) {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                cn(
                    "flex flex-col items-center gap-1 text-xs transition-colors relative px-1",
                    isActive ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
                )
            }
        >
            <div className="relative">
                {icon}
                {badge && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[9px] font-bold">{badge}</span>
                    </div>
                )}
            </div>
            <span className="font-medium">{label}</span>
        </NavLink>
    );
}
