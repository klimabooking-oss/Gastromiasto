import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, BookOpen, Map, PieChart, Bell, User, Menu as MenuIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export default function B2BLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#f3f4f6] flex flex-col md:flex-row text-primary font-sans">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between bg-primary text-white p-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon size={24} />
                    </button>
                    <h1 className="font-bold text-lg tracking-tight">GastroMiasto B2B</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "text-xs font-bold py-1 px-3 rounded-full transition-colors hidden sm:block",
                            isOpen ? "bg-success text-white" : "bg-gray-500 text-white"
                        )}
                    >
                        {isOpen ? "OTWARTE" : "ZAMKNIĘTE"}
                    </button>
                    <Bell size={20} />
                    <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                        <User className="w-full h-full text-gray-500 mt-1" />
                    </div>
                </div>
            </div>

            {/* Sidebar Navigation */}
            <aside className={cn(
                "bg-primary text-gray-300 w-full md:w-64 flex-shrink-0 flex flex-col md:h-screen sticky top-0 md:static transition-all duration-300",
                isSidebarOpen ? "h-auto" : "h-0 md:h-screen overflow-hidden"
            )}>
                <div className="p-6 hidden md:flex flex-col gap-6">
                    <h1 className="font-bold text-2xl text-white tracking-tight">GastroMiasto<span className="text-orange-500">.</span></h1>

                    <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl">
                        <span className="text-sm font-medium text-white">{isOpen ? "Restauracja Otwarta" : "Zamknięte"}</span>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                isOpen ? "bg-success" : "bg-gray-500"
                            )}
                        >
                            <span className={cn(
                                "inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out",
                                isOpen ? "translate-x-6" : "translate-x-1"
                            )} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-2 p-4 md:p-6 overflow-y-auto w-full">
                    <NavItem to="/b2b" icon={<LayoutDashboard size={20} />} label="Pulpit Główny" end />
                    <NavItem to="/b2b/terminal" icon={<ClipboardList size={20} />} label="Terminal Zamówień" />
                    <NavItem to="/b2b/menu-editor" icon={<BookOpen size={20} />} label="Edytor Menu" />
                    <NavItem to="/b2b/zones" icon={<Map size={20} />} label="Logistyka i Strefy" />
                    <NavItem to="/b2b/finance" icon={<PieChart size={20} />} label="Finanse i Subskrypcje" />

                    <div className="mt-8 border-t border-white/10 pt-4">
                        <NavLink to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-400 hover:bg-white/5 transition-all w-full text-left">
                            Wyloguj (Demo)
                        </NavLink>
                    </div>
                </nav>

                <div className="p-4 md:p-6 mt-auto hidden md:flex items-center gap-3 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <User size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white leading-tight">Pasibus Rynek</p>
                        <p className="text-xs text-gray-400">Zarządca</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full relative h-[calc(100vh-60px)] md:h-screen overflow-y-auto">
                <div className="p-4 md:p-8 max-w-6xl mx-auto pb-24">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

function NavItem({ to, icon, label, end = false }) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                        ? "bg-white/10 text-white shadow-sm"
                        : "hover:bg-white/5 hover:text-white"
                )
            }
        >
            {icon}
            {label}
        </NavLink>
    );
}
