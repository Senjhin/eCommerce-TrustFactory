import { Link, usePage } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';

export default function Navbar({ user }) {
    const { openCart } = useCart();
    const { auth } = usePage().props;
    const cartItems = auth.cart || [];
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href={route('dashboard')} className="group">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
                                    <span className="text-white font-bold text-xl">E</span>
                                </div>
                            </Link>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <Link 
                                href={route('dashboard')} 
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${route().current('dashboard') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Store
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center sm:ms-6 space-x-4">
                        <button 
                            onClick={openCart}
                            className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors group"
                        >
                            <div className="absolute top-0 right-0 -mr-1 -mt-1">
                                {cartCount > 0 && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse-once">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </button>

                        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-sm font-semibold text-gray-700 hidden sm:block">
                                {user.name}
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                                title="Log Out"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}