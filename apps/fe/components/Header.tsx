"use client"

import React, { useState } from 'react';
import { Monitor, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Monitor className="h-8 w-8 text-blue-500" />
                        <span className="text-xl font-bold text-white">StatusBus</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => {router.push('/signin')}} className="text-slate-300 hover:text-white transition-colors">
                            Sign In
                        </button>
                        <button onClick={() => {router.push('/signup')}} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            Sign Up
                        </button>
                    </div>

                    <button
                        className="md:hidden text-slate-300 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-800">
                        <nav className="flex flex-col space-y-4">
                            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
                            <div className="pt-4 border-t border-slate-800">
                                <button onClick={() => {router.push('/signin')}} className="block w-full text-left text-slate-300 hover:text-white transition-colors mb-2">Sign In</button>
                                <button onClick={() => {router.push('/signup')}} className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Sign Up
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};