import { CartProvider } from '@/Contexts/CartContext';
import CartSidebar from '@/Components/CartSidebar';
import Navbar from '@/Components/Navbar';

// Główny layout musi owijać wszystko w CartProvider
export default function AuthenticatedLayout({ user, header, children }) {
    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                {/* Navbar jest teraz wewnątrz CartProvider, więc useCart zadziała */}
                <Navbar user={user} />

                {header && (
                    <header className="bg-white/50 backdrop-blur-sm border-b border-gray-100">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="transition-all duration-300 ease-in-out">
                    {children}
                </main>

                {/* Sidebar również wewnątrz Providera */}
                <CartSidebar />
            </div>
        </CartProvider>
    );
}