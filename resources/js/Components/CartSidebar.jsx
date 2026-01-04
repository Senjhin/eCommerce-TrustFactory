import { useCart } from '@/Contexts/CartContext';
import { usePage, router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function CartSidebar() {
    const { isCartOpen, closeCart } = useCart();
    const { auth } = usePage().props;
    const cartItems = auth.cart || [];
    const sidebarRef = useRef(null);

    const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        router.patch(route('cart.update', id), { quantity }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        router.delete(route('cart.remove', id), { preserveScroll: true });
    };

    const checkout = () => {
        router.post(route('checkout'), {}, { 
            preserveScroll: true,
            onSuccess: () => closeCart()
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isCartOpen) {
                closeCart();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCartOpen]);

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            ></div>

            <div 
                ref={sidebarRef}
                className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart ({cartItems.length})</h2>
                    <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            </div>
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <p className="text-sm text-gray-400 mt-1">Looks like you haven't added anything yet.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="w-20 h-24 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100 relative">
                                    {item.product.image_url ? (
                                        <img src={item.product.image_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        // PLACEHOLDER DLA KOSZYKA
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                             <svg className="w-8 h-8 text-indigo-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 7.35304L21 16.647C21 16.8594 20.9436 17.0672 20.837 17.2476C20.7303 17.428 20.5776 17.5741 20.3953 17.6698L12.3953 21.8698C12.2731 21.9339 12.1374 21.9673 12 21.9673C11.8626 21.9673 11.7269 21.9339 11.6047 21.8698L3.60468 17.6698C3.42236 17.5741 3.26966 17.428 3.16305 17.2476C3.05644 17.0672 3.00004 16.8594 3 16.647V7.35304C3.00004 7.14064 3.05644 6.93282 3.16305 6.75241C3.26966 6.57201 3.42236 6.4259 3.60468 6.33023L11.6047 2.13023C11.7269 2.06611 11.8626 2.03271 12 2.03271C12.1374 2.03271 12.2731 2.06611 12.3953 2.13023L20.3953 6.33023C20.5776 6.4259 20.7303 6.57201 20.837 6.75241C20.9436 6.93282 21 7.14064 21 7.35304Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight">{item.product.name}</h3>
                                            <p className="font-bold text-gray-900 ml-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">${item.product.price} each</p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-8">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg transition"
                                            >−</button>
                                            <span className="w-8 text-center text-sm font-semibold text-gray-700">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg transition"
                                            >+</button>
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-medium">Subtotal</span>
                            <span className="text-2xl font-extrabold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                        <button
                            onClick={checkout}
                            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-600 hover:shadow-indigo-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Checkout Securely</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}