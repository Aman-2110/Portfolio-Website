import React, { useState } from 'react';
import { MenuIcon, XIcon } from './icons';

const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
];

const Navbar = ({ activeSection, setActiveSection }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const NavLink = ({ children, sectionId }) => (
        <button
            onClick={() => {
                if (typeof setActiveSection === 'function') {
                    setActiveSection(sectionId);
                }
                setIsMobileMenuOpen(false); // Close menu on click
                // Always scroll to top of section
                setTimeout(() => {
                    const el = document.getElementById(sectionId);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 0);

            }}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeSection === sectionId
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
            data-interactive
        >
            {children}
        </button>
    );

    return (
        <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md shadow-lg shadow-cyan-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-white cursor-default">
                            Aman<span className="text-cyan-400">.</span>
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <NavLink key={item.id} sectionId={item.id}>
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            data-interactive
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${activeSection === item.id
                                    ? 'text-cyan-400 bg-gray-900'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                }`}
                            data-interactive
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;