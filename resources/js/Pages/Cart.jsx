import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Cart({ auth, cartItems, total }) {
    const { patch, delete: destroy, post, processing } = useForm();

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        patch(route('cart.update', id), { quantity });
    };

    const removeItem = (id) => {
        destroy(route('cart.remove', id));
    };

    const checkout = () => {
        post(route('checkout'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Shopping Cart</h2>}
        >
            <Head title="Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                                    <Link href={route('dashboard')} className="text-indigo-600 hover:underline">Go back to shopping</Link>
                                </div>
                            ) : (
                                <>
                                    <ul className="divide-y divide-gray-200">
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="py-4 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <h4 className="text-lg font-bold">{item.product.name}</h4>
                                                        <p className="text-sm text-gray-500">${item.product.price} each</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center border rounded">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                                        >-</button>
                                                        <span className="px-3 py-1 border-l border-r">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                                        >+</button>
                                                    </div>
                                                    <p className="font-semibold w-20 text-right">
                                                        ${(item.quantity * item.product.price).toFixed(2)}
                                                    </p>
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 border-t pt-8 flex justify-between items-center">
                                        <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
                                        <button 
                                            onClick={checkout}
                                            disabled={processing}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors disabled:opacity-50"
                                        >
                                            {processing ? 'Processing...' : 'Checkout'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}