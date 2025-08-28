import React from 'react';
import { Monitor, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <Monitor className="h-8 w-8 text-blue-500" />
                            <span className="text-xl font-bold text-white">StatusBus</span>
                        </div>
                        <p className="text-slate-400 mb-4">
                            Monitor your websites 24/7 with instant alerts and detailed analytics.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Project</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 text-sm">
                        © 2025 StatusBus. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};