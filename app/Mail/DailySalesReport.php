<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DailySalesReport extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Collection $orders)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Daily Sales Report: ' . now()->format('M d, Y'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.daily_report',
        );
    }
}