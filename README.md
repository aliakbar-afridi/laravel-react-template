
# Laravel-React Template

A Laravel backend with a React frontend, all within the same repository, utilizing an AdminLTE Bootstrap 5 template for the admin dashboard.



## Features

- Admin LTE dashboard: Latest with Bootstrap 5.
- Sanctum for SPA: Use Laravel Sanctum for secure API authentication in SPAs.
- RBAC Implementation: Enforce role-based access control with Spatie’s permissions.
- API Client Setup: Use Axios with interceptors for efficient API management.


## Installation

Download or git clone the repo, move to project directory, setup .env, database and run 
the following commands.

Installation of packages
```bash
  composer install
  npm install
```
Run database migration
```bash
  php artisan migrate
```
Generate dummy data for testing
```bash
  php artisan db:seed --Class=DatabaseSeeder
```
Generate permission and assign all to 'super admin' role. Every time adding new route you will have to run the following command to generate new permissions.
```bash
  php artisan permissions:generate
```
Run server
```bash
  php artisan serve
  npm run dev
```
    
## Tech Stack

**Front:** React, AdminLTE, Bootstrap 5, React Router DOM

**Backend:** Laravel:11


## Authors

- [@aliakbar22](https://www.github.com/aliakbar22)

