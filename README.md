# Robo Shop

**Robo Shop** is a Django-based e-commerce web application for selling **electronic components** — Arduino boards, Raspberry Pi, sensors, motors, and related modules. It supports multiple user roles (Admin, Seller, Buyer), a shopping cart, checkout with Algerian wilayas and payment options, and a seller dashboard for managing products and orders.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [URLs & Pages](#urls--pages)
- [Configuration](#configuration)
- [License](#license)

---

## Features

- **Home page** — Products grouped by category, search by name/description, filter by category, hero search bar, category pills.
- **Product catalog** — Categories, product cards with image, price, stock badge, "Add to cart" with quantity.
- **Product detail** — Full description, image, add to cart, edit/delete for sellers.
- **Shopping cart** — Add, update quantity, remove items; session-based cart with totals.
- **Checkout** — Login required; collect first name, last name, phone, wilaya (Algerian state), address, payment method; create order and payment record.
- **Order success** — Confirmation page after checkout.
- **Seller dashboard** — List own products and recent orders (order items) for the logged-in seller.
- **Seller profile** — Profile page for sellers (phone, address, etc.).
- **Add / Edit / Delete product** — Sellers can create products with image upload, edit, or delete (own products; admins can edit/delete any).
- **Authentication** — Register, login, logout; role-based access (Admin, Seller, Buyer).
- **Algerian localization** — Wilayas (48 states) and payment methods (Cash on Delivery, BaridiMob) for checkout.

---

## Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Backend     | **Django 5.2+**                     |
| Database    | **SQLite** (default; configurable) |
| Auth        | Django auth + custom **User** with roles |
| Media       | **Pillow** for image uploads        |
| Frontend    | **HTML5**, **Bootstrap 5**, custom **CSS** (design system, animations), vanilla **JavaScript** |
| Fonts       | **Outfit** (UI), **JetBrains Mono** (prices, badges) |

---

## Project Structure

```
roboooshoppp-main/
├── config/                 # Django project settings
│   ├── settings.py         # Main settings (apps, DB, static, media, auth)
│   ├── urls.py             # Root URLconf (admin, shop, accounts)
│   └── wsgi.py / asgi.py
├── accounts/               # User & auth app
│   ├── models.py           # User (role, phone, address), Seller profile
│   ├── views.py            # Register, login, logout, seller profile
│   ├── urls.py             # accounts/register, login, logout, seller/profile
│   ├── forms.py
│   ├── decorators.py       # seller_required, etc.
│   └── migrations/
├── shop/                   # E-commerce app
│   ├── models.py           # Category, Product, Order, OrderItem, Payment
│   ├── views.py            # Home, product detail, cart, checkout, seller dashboard, product CRUD
│   ├── urls.py             # Shop routes (home, product, cart, checkout, seller)
│   ├── forms.py            # ProductForm, CheckoutForm
│   ├── services.py         # ProductService, CartService, OrderService
│   ├── constants.py        # WILAYAS, PAYMENT_METHODS
│   ├── context_processors.py  # cart_count for templates
│   └── migrations/
├── templates/
│   ├── base.html           # Navbar, messages, footer, blocks
│   ├── accounts/           # login, register, seller_profile
│   └── shop/               # home, product_detail, cart, checkout, order_success, seller_dashboard, product_form
├── static/
│   ├── css/
│   │   └── style.css       # Design system, hero, cards, pills, animations
│   └── js/
│       └── main.js         # Navbar scroll, alerts, smooth scroll, add-to-cart feedback
├── media/                  # User-uploaded product images (products/)
├── manage.py
├── requirements.txt        # Django>=5.2, Pillow>=10.0
└── README.md               # This file
```

---

## Getting Started

### 1. Clone and enter the project

```bash
git clone <repo-url>
cd roboooshoppp-main
```

### 2. Create a virtual environment (recommended)

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run migrations

```bash
python manage.py migrate
```

### 5. (Optional) Create a superuser and load sample data

```bash
python manage.py createsuperuser
# If the project provides a management command for sample data:
python manage.py setup_data
```

### 6. Run the development server

```bash
python manage.py runserver
```

Open **http://127.0.0.1:8000/** in your browser. Use the admin at **http://127.0.0.1:8000/admin/** if you created a superuser.

---

## User Roles

| Role   | Description |
|--------|-------------|
| **Admin** | Full access; can manage any product, access Django admin. |
| **Seller** | Can add/edit/delete own products, view seller dashboard and seller profile. |
| **Buyer** | Can browse, add to cart, checkout; no product management. |

- Registration and login set or use the user's role.
- Views use `@login_required` and `@seller_required` (or equivalent) to enforce permissions.

---

## URLs & Pages

| URL (example)              | View / Purpose                |
|----------------------------|-------------------------------|
| `/`                        | Home — products by category, search, filters |
| `/product/<slug>/`         | Product detail                |
| `/product/add/`            | Add product (seller)          |
| `/product/<slug>/edit/`    | Edit product (seller/admin)   |
| `/product/<slug>/delete/`  | Delete product (POST)         |
| `/cart/`                   | Cart — list, update, remove   |
| `/checkout/`               | Checkout (login required)     |
| `/order/<id>/success/`     | Order confirmation            |
| `/seller/dashboard/`       | Seller dashboard              |
| `/accounts/register/`      | Register                      |
| `/accounts/login/`         | Login                         |
| `/accounts/logout/`        | Logout (POST)                 |
| `/accounts/seller/profile/`| Seller profile                |
| `/admin/`                  | Django admin                  |

Cart actions (add/remove/update) are POST endpoints; the rest are linked from the navbar and templates.

---

## Configuration

- **Database**: Default is SQLite (`db.sqlite3`). To use PostgreSQL or MySQL, change `DATABASES` in `config/settings.py` and install the appropriate driver.
- **Static & media**: `STATIC_URL` / `STATICFILES_DIRS` and `MEDIA_URL` / `MEDIA_ROOT` are set in `config/settings.py`. In development, `config/urls.py` serves media files when `DEBUG=True`.
- **Secret key**: Replace `SECRET_KEY` and set `DEBUG=False`, `ALLOWED_HOSTS`, and a proper WSGI/ASGI server for production.

---

## License

This project is provided as-is. Use and modify according to your needs.

---

**Robo Shop** — Arduino, Raspberry Pi, Sensors & Motors.
