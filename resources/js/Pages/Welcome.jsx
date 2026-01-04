import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-500 selection:text-white">
                <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40 z-0">
                        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full blur-3xl bg-indigo-100 opacity-50 mix-blend-multiply animate-blob"></div>
                        <div className="absolute left-0 bottom-0 -ml-20 -mb-20 w-[600px] h-[600px] rounded-full blur-3xl bg-blue-100 opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <header className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">E</span>
                                </div>
                                <span className="font-bold text-xl tracking-tight text-gray-900">Commerce.io</span>
                            </div>
                            <nav>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-4">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 transition"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </header>

                        <main className="mt-16 sm:mt-24 text-center">
                            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
                                The future of <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                                    digital shopping.
                                </span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10">
                                Experience a curated marketplace reserved exclusively for our members. 
                                Join today to access premium products with real-time stock tracking and seamless checkout.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-1"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg shadow-sm hover:bg-gray-50 transition"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}

                            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                                <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Members Only</h3>
                                    <p className="text-gray-500">
                                        We protect our inventory for registered users. Create an account to unlock pricing and availability.
                                    </p>
                                </div>
                                <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Sync</h3>
                                    <p className="text-gray-500">
                                        Our cart system uses Inertia.js for instant updates without page reloads. Speed matters.
                                    </p>
                                </div>
                                <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Checkout</h3>
                                    <p className="text-gray-500">
                                        Built on Laravel 10 with robust database transactions to ensure your order is always accurate.
                                    </p>
                                </div>
                            </div>
                        </main>

                        <footer className="mt-24 pb-8 border-t border-gray-200 pt-8 flex justify-between items-center text-sm text-gray-400">
                            <p>&copy; {new Date().getFullYear()} E-Commerce Task. All rights reserved.</p>
                            <div className="flex space-x-6">
                                <a href="#" className="hover:text-gray-600 transition">Privacy</a>
                                <a href="#" className="hover:text-gray-600 transition">Terms</a>
                                <a href="https://github.com/dylanmichaelryan" target="_blank" className="hover:text-gray-600 transition">GitHub</a>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </>
    );
}