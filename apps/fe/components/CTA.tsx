import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

export const CTA: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-8">
                    <Shield className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Start monitoring your websites today
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of developers who trust StatusBus to keep their websites
                        running smoothly. Get started with our free plan in less than 2 minutes.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>

                    <button className="border border-slate-500 hover:border-slate-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                        Schedule Demo
                    </button>
                </div>

                <div className="text-slate-400">
                    <p className="mb-2">No credit card required • 14-day free trial • Cancel anytime</p>
                    <p className="text-sm">Trusted by 10,000+ websites worldwide</p>
                </div>
            </div>
        </section>
    );
};