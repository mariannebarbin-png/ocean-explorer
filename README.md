<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# Ocean Explorer – Marine Species Discovery System

## Project Overview
Ocean Explorer is a web-based marine species discovery and collection system.  
Users can explore marine life, view detailed species information, and build their own personal marine collection with notes.


## Tech Stack

### Backend
- Laravel 12
- PHP 8+
- MySQL
- Laravel Breeze (Authentication)
- Laravel Sanctum (CSRF & SPA support)

### Frontend
- React (via Inertia.js)
- Tailwind CSS
- Framer Motion

### External API
- iNaturalist API (Species data)

---

## Features
- User authentication (Register, Login, Logout, Email Verification)
- Explore marine species via search
- View species details
- Add species to personal collection
- Add and edit notes per species (real-time update)
- Animated ocean-themed UI
- CSRF-protected requests for security

---

## System Requirements
- PHP 8.1+
- Composer
- Node.js
- NPM
- MySQL

---

## Installation Guide

### 1. Clone Repository
git clone https://github.com/your-username/ocean-explorer.git
cd ocean-explorer

### 2. Install Backend Dependencies
composer install

### 3. Install Frontend Dependencies
npm install

### 4. Environment Setup
cp .env.example .env
Update .env database credentials:
Env
DB_DATABASE=ocean_explorer
DB_USERNAME=root
DB_PASSWORD=

### 5. Generate App Key
php artisan key:generate

### 6. Run Migrations
php artisan migrate

### 7. Build Frontend Assets
npm run dev

### 8. Run the Application
php artisan serve
Access the app at:
http://127.0.0.1:8000

### Authentication
Handled using Laravel Breeze
Protected routes use auth and verified middleware
Sessions are regenerated after login/logout for security

### CSRF Handling
Custom CSRF utilities are implemented to support SPA behavior
CSRF token is fetched and attached automatically to POST, PATCH, and DELETE requests
Prevents 419 Page Expired errors

### Marine Species Data
Data is fetched from the iNaturalist API
Filtering logic is applied to reduce non-marine species results

### Work Distribution
(Barbin) Backend: Authentication, API integration, database, CSRF handling

(Aurea) Frontend: UI design, animations, pages, components

(Quilaton) Integration & Testing: Feature integration, bug fixing, UX testing

