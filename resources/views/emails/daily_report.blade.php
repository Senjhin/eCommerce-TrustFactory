<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Sales Report</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        table { border-spacing: 0; border-collapse: collapse; }
        td { padding: 0; }
        img { border: 0; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f3f4f6; padding-bottom: 40px; }
        .webkit { max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .header { background-color: #111827; padding: 30px 40px; text-align: center; }
        .content { padding: 40px; }
        .kpi-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px; }
        .table-header { color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb; }
        .table-row td { padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-size: 14px; }
        .table-row:last-child td { border-bottom: none; }
        .footer { background-color: #f9fafb; padding: 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        .badge { background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    </style>
</head>
<body>
    @php
        $totalRevenue = $orders->sum('total_price');
        $totalItems = $orders->sum(fn($order) => $order->items->sum('quantity'));
    @endphp

    <center class="wrapper">
        <div class="webkit">
            <table class="webkit" role="presentation" width="100%">
                <tr>
                    <td class="header">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Executive Report</h1>
                        <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 14px;">{{ now()->format('l, F jS, Y') }}</p>
                    </td>
                </tr>
                <tr>
                    <td class="content">
                        <table width="100%" role="presentation">
                            <tr>
                                <td width="48%" class="kpi-card">
                                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Total Revenue</p>
                                    <p style="margin: 5px 0 0 0; color: #111827; font-size: 24px; font-weight: 700;">${{ number_format($totalRevenue, 2) }}</p>
                                </td>
                                <td width="4%"></td>
                                <td width="48%" class="kpi-card">
                                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600;">Orders Processed</p>
                                    <p style="margin: 5px 0 0 0; color: #111827; font-size: 24px; font-weight: 700;">{{ $orders->count() }}</p>
                                </td>
                            </tr>
                        </table>

                        <h3 style="color: #111827; font-size: 16px; margin: 30px 0 15px 0;">Product Breakdown</h3>
                        
                        <table width="100%" role="presentation">
                            <thead>
                                <tr>
                                    <th align="left" class="table-header">Product</th>
                                    <th align="right" class="table-header">Qty</th>
                                    <th align="right" class="table-header">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($orders as $order)
                                    @foreach($order->items as $item)
                                    <tr class="table-row">
                                        <td align="left" style="font-weight: 500;">
                                            {{ $item->product->name }}
                                            <div style="font-size: 11px; color: #9ca3af; font-weight: 400;">Order #{{ $order->id }}</div>
                                        </td>
                                        <td align="right" style="color: #6b7280;">{{ $item->quantity }}</td>
                                        <td align="right" style="font-weight: 600;">${{ number_format($item->price * $item->quantity, 2) }}</td>
                                    </tr>
                                    @endforeach
                                @empty
                                    <tr>
                                        <td colspan="3" style="text-align: center; padding: 40px 0; color: #9ca3af;">
                                            No sales recorded today.
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>

                        <div style="text-align: center; margin-top: 30px;">
                            <a href="{{ url('/dashboard') }}" style="color: #4f46e5; font-size: 14px; text-decoration: none; font-weight: 600;">View Full Analytics &rarr;</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="footer">
                        <p style="margin: 0;">&copy; {{ date('Y') }} E-Commerce Inc. Confidential Daily Report.</p>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>
</html>