import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, ClipboardList, ShoppingCart, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function B2CLayout() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {/* Mobile container constraint for desktop viewing */}
            <div className="w-full max-w-md bg-white min-h-screen shadow-xl relative flex flex-col">
                <div className="flex-1 overflow-y-auto pb-20">
                    <Outlet />
                </div>

                {/* Bottom Navigation */}
                <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center py-3 pb-safe z-50">
                    <NavItem to="/home" icon={<Home size={24} />} label="Główna" exact />
                    <NavItem to="/home/menu" icon={<ClipboardList size={24} />} label="Zamówienia" />
                    <NavItem to="/home/checkout" icon={<ShoppingCart size={24} />} label="Koszyk" />
                    <NavItem to="/login" icon={<User size={24} />} label="Wyloguj" />
                </nav>
            </div>
        </div>
    );
}

function NavItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    "flex flex-col items-center gap-1 text-xs transition-colors",
                    isActive ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
                )
            }
        >
            {icon}
            <span className="font-medium">{label}</span>
        </NavLink>
    );
}
