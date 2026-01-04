<?php

namespace App\Http\Controllers;

use App\Jobs\SendLowStockNotification;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        
        $cartItems = $user->cartItems()->with('product')->get();
        
        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'total' => $cartItems->sum(fn($item) => $item->quantity * $item->product->price),
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1'
        ]);

        /** @var User $user */
        $user = $request->user();

        $product = Product::find($request->product_id);
        $qtyToAdd = $request->quantity ?? 1;
        
        if ($product->stock_quantity < $qtyToAdd) {
             return back()->withErrors(['stock' => 'Not enough items in stock']);
        }

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            if ($product->stock_quantity < ($cartItem->quantity + $qtyToAdd)) {
                return back()->withErrors(['stock' => 'Not enough items in stock to add more']);
            }
            $cartItem->increment('quantity', $qtyToAdd);
        } else {
            CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $qtyToAdd
            ]);
        }

        return back();
    }

    public function update(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) abort(403);

        $request->validate(['quantity' => 'required|integer|min:1']);
        
        if ($cartItem->product->stock_quantity < $request->quantity) {
             return back()->withErrors(['stock' => 'Not enough stock']);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return back();
    }

    public function remove(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) abort(403);
        $cartItem->delete();
        return back();
    }

    public function checkout(Request $request)
    {
        return DB::transaction(function () use ($request) {
            /** @var User $user */
            $user = $request->user();
            
            $cartItems = $user->cartItems()->with('product')->get();

            if ($cartItems->isEmpty()) {
                return back()->withErrors(['cart' => 'Cart is empty']);
            }

            $total = $cartItems->sum(fn($item) => $item->quantity * $item->product->price);

            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $total
            ]);

            $purchasedItems = [];

            foreach ($cartItems as $item) {
                $product = $item->product;

                if ($product->stock_quantity < $item->quantity) {
                    throw new \Exception("Product {$product->name} is out of stock.");
                }

                // To wywołanie automatycznie uruchomi zdarzenie 'saved' w modelu Product
                // i jeśli stan spadnie < 10, wyśle maila.
                $product->decrement('stock_quantity', $item->quantity);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item->quantity,
                    'price' => $product->price
                ]);

                $purchasedItems[] = [
                    'name' => $product->name,
                    'quantity' => $item->quantity,
                    'price' => $product->price,
                ];
                
                // USUNIĘTO RĘCZNE WYSYŁANIE POWIADOMIENIA - TERAZ ROBI TO MODEL
            }

            $user->cartItems()->delete();

            return redirect()->route('dashboard')->with('order_success', [
                'id' => $order->id,
                'total' => $total,
                'items' => $purchasedItems
            ]);
        });
    }
}