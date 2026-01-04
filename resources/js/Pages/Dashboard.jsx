import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import { useState, useEffect } from 'react';

// Komponent Modala Sukcesu (Bez zmian, ale musi tu być dla pełnego pliku)
const OrderSuccessModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0">
            <div 
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl transform transition-all sm:max-w-md w-full overflow-hidden animate-blob-enter">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur-md mb-4 shadow-inner">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Order Confirmed!</h3>
                    <p className="text-indigo-100 mt-1 text-sm">Thank you for your purchase.</p>
                </div>

                <div className="px-6 py-6 bg-gray-50/50">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <span className="text-gray-500 text-sm">Order ID</span>
                        <span className="font-mono font-bold text-gray-900">#{String(order.id).padStart(6, '0')}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    <span className="font-bold text-gray-800">{item.quantity}x</span> {item.name}
                                </span>
                                <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-base font-bold text-gray-700">Total Amount</span>
                        <span className="text-2xl font-extrabold text-indigo-600">${Number(order.total).toFixed(2)}</span>
                    </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                    <button
                        onClick={onClose}
                        className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-lg shadow-indigo-500/20 px-4 py-3 bg-gray-900 text-base font-bold text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 active:scale-95"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
            
            <style>{`
                @keyframes enter {
                    0% { opacity: 0; transform: scale(0.95) translateY(10px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-blob-enter {
                    animation: enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

const ProductCard = ({ product, availableStock }) => {
    const { post, processing } = useForm();
    const { openCart } = useCart();

    const addToCart = () => {
        post(route('cart.add', { product_id: product.id }), {
            preserveScroll: true,
            onSuccess: () => {
                openCart();
            }
        });
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                {product.image_url ? (
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" 
                    />
                ) : (
                    // --- ULTRA NOWOCZESNY PLACEHOLDER ---
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden group-hover:from-indigo-50/50 group-hover:to-blue-50/50 transition-colors duration-500">
                        {/* Dekoracyjne tło */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        
                        {/* Ikona 3D */}
                        <svg className="w-20 h-20 text-indigo-200 group-hover:text-indigo-400 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out drop-shadow-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 7.35304L21 16.647C21 16.8594 20.9436 17.0672 20.837 17.2476C20.7303 17.428 20.5776 17.5741 20.3953 17.6698L12.3953 21.8698C12.2731 21.9339 12.1374 21.9673 12 21.9673C11.8626 21.9673 11.7269 21.9339 11.6047 21.8698L3.60468 17.6698C3.42236 17.5741 3.26966 17.428 3.16305 17.2476C3.05644 17.0672 3.00004 16.8594 3 16.647V7.35304C3.00004 7.14064 3.05644 6.93282 3.16305 6.75241C3.26966 6.57201 3.42236 6.4259 3.60468 6.33023L11.6047 2.13023C11.7269 2.06611 11.8626 2.03271 12 2.03271C12.1374 2.03271 12.2731 2.06611 12.3953 2.13023L20.3953 6.33023C20.5776 6.4259 20.7303 6.57201 20.837 6.75241C20.9436 6.93282 21 7.14064 21 7.35304Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.20898 6.53857L12 11.154L20.791 6.53857" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 21.7694V11.1541" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.5 9L7.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                )}
                
                {availableStock > 0 && availableStock < 10 && (
                    <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200 shadow-sm backdrop-blur-md z-10">
                        Low Stock: {availableStock}
                    </div>
                )}

                {availableStock === 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <span className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform -rotate-3">
                            Sold Out
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col h-auto">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>
                    <span className="text-lg font-bold text-gray-900">
                        ${Number(product.price).toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center space-x-2 mb-6">
                    <span className={`flex h-2 w-2 rounded-full ${availableStock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <p className="text-sm text-gray-500 font-medium">
                        {availableStock > 0 ? `${availableStock} available` : 'Unavailable'}
                    </p>
                </div>

                <button
                    onClick={addToCart}
                    disabled={availableStock === 0 || processing}
                    className={`mt-auto w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                        availableStock > 0 
                        ? 'bg-gray-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {processing ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            <span>{availableStock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default function Dashboard({ auth, products }) {
    const { cart } = usePage().props.auth;
    const { flash } = usePage().props;
    const cartItems = cart || [];
    const [successOrder, setSuccessOrder] = useState(null);

    useEffect(() => {
        if (flash.order_success) {
            setSuccessOrder(flash.order_success);
        }
    }, [flash]);

    const getRemainingStock = (product) => {
        const cartItem = cartItems.find(item => item.product_id === product.id);
        const inCartQuantity = cartItem ? cartItem.quantity : 0;
        return Math.max(0, product.stock_quantity - inCartQuantity);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-gray-900 tracking-tight">Marketplace</h2>
                        <p className="text-sm text-gray-500 mt-1">Browse our exclusive collection</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 shadow-sm">
                        {products.length} Products
                    </span>
                </div>
            }
        >
            <Head title="Store" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                availableStock={getRemainingStock(product)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {successOrder && (
                <OrderSuccessModal 
                    order={successOrder} 
                    onClose={() => setSuccessOrder(null)} 
                />
            )}
        </AuthenticatedLayout>
    );
}