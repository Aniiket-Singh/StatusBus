"use client"
import React, { useState } from 'react';
import { Monitor, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface SignInProps {
    onBack: () => void;
    onSwitchToSignUp: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onBack, onSwitchToSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign in logic here
        console.log('Sign in:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to home
                    </button>

                    <div className="flex items-center justify-center mb-8">
                        <Monitor className="h-12 w-12 text-blue-500" />
                        <span className="ml-3 text-2xl font-bold text-white">StatusWatch</span>
                    </div>

                    <h2 className="text-center text-3xl font-bold text-white">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Sign in to your account to continue monitoring
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-600 placeholder-slate-400 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-slate-600 placeholder-slate-400 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <span className="text-slate-400">Don't have an account? </span>
                        <button
                            type="button"
                            onClick={onSwitchToSignUp}
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};