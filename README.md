# 🛒 Laravel E-commerce TrustFactory Task

A modern, full-stack shopping cart application built with **Laravel 12.x** and **React** (via **Inertia.js 2.0**).

This project demonstrates a robust backend architecture (atomic transactions, asynchronous queues, model events) combined with an ultra-modern frontend experience (SPA, Glassmorphism, real-time state management).

---

## 🚀 Key Features

### 🎨 Frontend & UI
- **Inertia.js 2.0:** "Modern Monolith" architecture providing the speed of a Single Page Application (SPA) without the complexity of client-side routing.
- **React Context API:** Global state management for the Cart. The Sidebar, Navbar, and Dashboard synchronize instantly without page reloads.
- **Ultra-Modern UI:** Custom **Tailwind CSS** design featuring Glassmorphism, animated backgrounds, and 3D-style icons.
- **Dynamic UX:** "Add to Cart" actions trigger the sidebar instantly; stock availability indicators update in real-time.

### ⚙️ Backend & Architecture
- **Atomic Transactions:** Checkout logic is wrapped in database transactions (`DB::transaction`) to ensure data integrity and prevent race conditions.
- **Model Events:** Automated `LowStockNotification` triggers via Eloquent Model events (`saved`), ensuring the system is bulletproof against edge cases.
- **Background Queues:** Asynchronous email processing using Laravel Queues (Database driver) to keep the user interface snappy.
- **Task Scheduling:** Automated Daily Sales Reports configured with timezone awareness (`Europe/Warsaw`).

### 🛠️ Developer Experience (DX)
- **One-Command Start:** Optimized local development environment. A single command (`composer run dev`) utilizes **concurrently** to spin up the Server, Vite, Queue Worker, and Scheduler simultaneously.
- **Clean Code:** Use of Constants, Strict Typing, and separation of concerns.

---

## 🛠️ Tech Stack

- **Backend:** PHP 8.2+, Laravel 12.x (Latest)
- **Frontend:** React 18, Inertia.js 2.0, Tailwind CSS v4
- **Database:** SQLite (Default)
- **Tools:** Vite, Concurrently, Ziggy (Named routes in JavaScript)

---

## ⚡ Installation Guide (Step-by-Step)

Follow these steps to get the project running locally.

### 1. Prerequisites
Ensure you have the following installed on your machine:
- PHP >= 8.2
- Composer
- Node.js & NPM

### 2. Clone the Repository

Clone the project to your local machine:

```bash
git clone [https://github.com/Senjhin/eCommerce-TrustFactory.git](https://github.com/Senjhin/eCommerce-TrustFactory.git)
cd eCommerce-TrustFactory
```

### 3. Install Dependencies

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
```

### 4. Run application
```bash
composer run dev
```

### 5. Open http://localhost:8000 
