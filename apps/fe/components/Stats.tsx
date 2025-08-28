import React from 'react';

const stats = [
    { number: "24*7", label: "Uptime" },
    { number: "< 30s", label: "Alert Response Time" },
    { number: "2", label: "Global Locations" },
    { number: "10+", label: "Websites Monitored" }
];

export const Stats: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {stat.number}
                            </div>
                            <div className="text-blue-100">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};