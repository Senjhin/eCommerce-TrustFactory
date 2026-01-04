import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <Head title="Forgot Password" />

            {/* Animated Background Elements (Pink/Purple theme for distinction) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full bg-pink-200 blur-[100px] opacity-40 animate-blob"></div>
                <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-200 blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-fuchsia-100 blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center">
                    <Link href="/" className="group">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-bold text-2xl">E</span>
                        </div>
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Reset Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w-xs mx-auto">
                    Don't worry, it happens to the best of us.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white/70 backdrop-blur-xl py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-10 border border-white/50">
                    
                    <div className="mb-6 text-sm text-gray-500 leading-relaxed text-center">
                        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="mb-6 font-medium text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center shadow-sm">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-white/50 transition-all duration-200"
                                    placeholder="name@example.com"
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.email}</div>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between space-x-4">
                            <Link
                                href={route('login')}
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Back to Login
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gray-900 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Sending Link...' : 'Email Reset Link'}
                            </button>
                        </div>
                    </form>
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
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}