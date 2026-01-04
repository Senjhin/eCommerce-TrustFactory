<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Low Stock Alert</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        table { border-spacing: 0; }
        td { padding: 0; }
        img { border: 0; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f3f4f6; padding-bottom: 40px; }
        .webkit { max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .header { background-color: #111827; padding: 30px 40px; text-align: center; }
        .content { padding: 40px; }
        .product-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-top: 20px; }
        .stock-badge { background-color: #fee2e2; color: #991b1b; padding: 6px 12px; border-radius: 9999px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; }
        .btn { background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 6px; font-weight: 600; display: inline-block; margin-top: 30px; }
        .footer { background-color: #f9fafb; padding: 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <center class="wrapper">
        <div class="webkit">
            <table class="webkit" role="presentation" width="100%">
                <tr>
                    <td class="header">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Inventory System</h1>
                    </td>
                </tr>
                <tr>
                    <td class="content">
                        <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">Action Required: Low Stock</h2>
                        <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 0 0 24px 0;">
                            This is an automated notification indicating that the inventory level for a specific product has dropped below the defined threshold.
                        </p>
                        
                        <table width="100%" role="presentation" class="product-card">
                            <tr>
                                <td>
                                    <table width="100%">
                                        <tr>
                                            <td style="vertical-align: top;">
                                                <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Product Name</p>
                                                <p style="margin: 4px 0 0 0; font-size: 18px; color: #111827; font-weight: 700;">{{ $product->name }}</p>
                                            </td>
                                            <td style="text-align: right; vertical-align: top;">
                                                <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Current Price</p>
                                                <p style="margin: 4px 0 0 0; font-size: 18px; color: #111827; font-weight: 600;">${{ number_format($product->price, 2) }}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="padding-top: 24px;">
                                                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px dashed #d1d5db; padding-top: 16px;">
                                                    <span style="color: #374151; font-weight: 500;">Remaining Quantity:</span>
                                                    <span class="stock-badge">{{ $product->stock_quantity }} units</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <div style="text-align: center;">
                            <a href="{{ url('/dashboard') }}" class="btn">Manage Inventory</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="footer">
                        <p style="margin: 0;">&copy; {{ date('Y') }} E-Commerce Task. Automated System Notification.</p>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>
</html>