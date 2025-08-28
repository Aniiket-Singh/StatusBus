"use client"
import React, { useState } from 'react';
import { Monitor, Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/utils';
import axios from 'axios';


const SignUp: React.FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await axios.post(`${BACKEND_URL}/user/signup`,{
            username: formData.username,
            password: formData.password
        })

        if(response.status == 200) {
            console.log('Sign up successful:', formData);
            router.push('/signin');
        } else {
            console.error('Sign up failed:', response.data);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const passwordsMatch = formData.password === formData.confirmPassword;

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <button
                        onClick={() => {router.back()}}
                        className="flex items-center text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </button>

                    <div className="flex items-center justify-center mb-8">
                        <Monitor className="h-12 w-12 text-blue-500" />
                        <span className="ml-3 text-2xl font-bold text-white">StatusBus</span>
                    </div>

                    <h2 className="text-center text-3xl font-bold text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Start monitoring your websites in minutes
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-3 py-3 border border-slate-600 placeholder-slate-400 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-slate-600 placeholder-slate-400 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Create a strong password"
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-slate-600 placeholder-slate-400 text-white bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                                    )}
                                </button>
                            </div>
                            {formData.confirmPassword && (
                                <div className="mt-2 flex items-center text-sm">
                                    {passwordsMatch ? (
                                        <Check className="h-4 w-4 text-green-400 mr-2" />
                                    ) : (
                                        <div className="h-4 w-4 mr-2" />
                                    )}
                                    <span className={passwordsMatch ? 'text-green-400' : 'text-red-400'}>
                                        {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={ !passwordsMatch}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Create account
                        </button>
                    </div>

                    <div className="text-center">
                        <span className="text-slate-400">Already have an account? </span>
                        <button
                            type="button"
                            onClick={() => {router.push('/signin')}}
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;