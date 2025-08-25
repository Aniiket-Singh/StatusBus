"use client"
import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';


export const Hero: React.FC = () => {
    const router = useRouter();
    return (
        <section className="bg-gradient-to-br from-slate-900 via-cyan-800 to-slate-900 pt-16 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Flawless Monitoring Achieved
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Monitor Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                {' '}Website Status
                            </span>
                            {' '}24/7
                        </h1>

                        <p className="text-xl text-slate-400 mb-8 max-w-2xl">
                            Get instant alerts when your websites go down. Track performance, uptime, and user experience
                            from multiple locations worldwide.
                        </p>

                        <button onClick = {() => {router.push("/signup")}} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                            Start Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>

                        <div className="flex items-center justify-center lg:justify-start mt-8 text-sm text-slate-400">
                            <span>✓ No credit card required</span>
                            <span className="mx-4">✓ 14-day free trial</span>
                            <span>✓ Cancel anytime</span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700">
                            <div className="flex items-center mb-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="ml-4 text-slate-400 text-sm">StatusWatch Dashboard</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                                        <span className="text-white">example.com</span>
                                    </div>
                                    <span className="text-green-400 text-sm">99.9%</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                                        <span className="text-white">api.example.com</span>
                                    </div>
                                    <span className="text-green-400 text-sm">100%</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                                        <span className="text-white">blog.example.com</span>
                                    </div>
                                    <span className="text-yellow-400 text-sm">95.2%</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                                        <span className="text-white">shop.example.com</span>
                                    </div>
                                    <span className="text-red-400 text-sm">Down</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm animate-bounce">
                            Alert Sent!
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};