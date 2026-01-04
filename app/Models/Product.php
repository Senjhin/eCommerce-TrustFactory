<?php

namespace App\Models;

use App\Jobs\SendLowStockNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'stock_quantity',
        'image_url'
    ];

    // Stała, o której wspominaliśmy - dobra praktyka
    public const LOW_STOCK_THRESHOLD = 10;

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::saved(function (Product $product) {
            // Sprawdź, czy stan jest niski ORAZ (czy produkt jest nowy LUB czy stan się właśnie zmienił)
            // Dzięki temu unikamy wysyłania maili przy edycji np. samej nazwy produktu.
            $isLowStock = $product->stock_quantity < self::LOW_STOCK_THRESHOLD;
            $stockChanged = $product->wasRecentlyCreated || $product->wasChanged('stock_quantity');

            if ($isLowStock && $stockChanged) {
                SendLowStockNotification::dispatch($product);
            }
        });
    }
}