<?php

namespace App\Jobs;

use App\Mail\LowStockAlert;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendLowStockNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Product $product)
    {
    }

    public function handle(): void
    {
        Mail::to('admin@example.com')->send(new LowStockAlert($this->product));
    }
}