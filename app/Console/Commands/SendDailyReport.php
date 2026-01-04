<?php

namespace App\Console\Commands;

use App\Mail\DailySalesReport;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendDailyReport extends Command
{
    protected $signature = 'app:send-daily-report';
    protected $description = 'Send a daily report of sold products';

    public function handle()
    {
        $orders = Order::with('items.product')
            ->whereDate('created_at', Carbon::today())
            ->get();

        Mail::to('admin@example.com')->send(new DailySalesReport($orders));
    }
}