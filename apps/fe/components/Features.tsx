import React from 'react';
import {
    Globe,
    Bell,
    BarChart3,
    Shield,
    Clock,
    Zap,
    Users,
    Smartphone
} from 'lucide-react';

const features = [
    {
        icon: Globe,
        title: "Global Monitoring",
        description: "Monitor from 2 locations - India and US, to ensure your users get the best experience regardless of their location."
    },
    {
        icon: Bell,
        title: "Instant Alerts",
        description: "Get notified via email, SMS, Slack, or webhooks the moment something goes wrong with your website."
    },
    {
        icon: BarChart3,
        title: "Performance Analytics",
        description: "Track response times, uptime statistics, and performance trends."
    },
    {
        icon: Clock,
        title: "Historical Data",
        description: "Access months of historical uptime and performance data to identify patterns and trends."
    },
    {
        icon: Zap,
        title: "Fast Response Time",
        description: "Sub-30 second monitoring intervals ensure you're notified of issues before your users notice."
    }
];

export const Features: React.FC = () => {
    return (
        <section id="features" className="py-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Everything you need to monitor your websites
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Comprehensive monitoring tools designed for developers, DevOps teams, and businesses
                        who can't afford downtime.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <feature.icon className="h-6 w-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};