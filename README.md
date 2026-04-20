# 🛍️ Shoestore — E-Commerce Platform

A full-stack e-commerce platform built with **Spring Boot** and **React**, featuring JWT-based authentication, cart management, order processing, and a complete product catalog.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [API Reference](#api-reference)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)

---

## 📖 Overview

Shoestore is a modern full-stack e-commerce web application designed to provide a seamless shopping experience for users.

The platform allows users to:
- Browse products
- Add items to cart
- Place orders
- Track order history

Admins can:
- Manage product catalog
- Update order status

The backend exposes a secure REST API using **JWT authentication**, and the frontend is a **React SPA** consuming these APIs.

---

## ⚙️ Tech Stack

### 🔧 Backend

| Technology | Purpose |
|----------|--------|
| Spring Boot | REST API framework |
| Spring Security | Authentication & authorization |
| JWT | Stateless authentication |
| Spring Data JPA | ORM layer |
| Hibernate | Database mapping |
| MySQL | Relational database |
| Maven | Build tool |

---

### 🎨 Frontend

| Technology | Purpose |
|----------|--------|
| React | UI development |
| React Router | Navigation |
| Axios | API calls |
| Tailwind CSS | Styling |
| Vite | Dev server & build tool |

---

### 🗄️ Database

| Feature | Detail |
|---|---|
| Database | MySQL |
| ORM | Hibernate (JPA) |
| Relationships | One-to-One, One-to-Many |
| Transactions | Managed via `@Transactional` |

---

## 📡 API Reference

### 🔐 Auth — `/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register user | ❌ |
| POST | `/auth/login` | Login & get JWT | ❌ |

---

### 👤 User — `/user`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user/profile` | Get profile | ✅ |
| PUT | `/user/profile` | Update profile | ✅ |
| DELETE | `/user/profile` | Delete account | ✅ |

---

### 👟 Products — `/products`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/products` | Get all products | ❌ |
| GET | `/products/{id}` | Get product by ID | ❌ |
| POST | `/products` | Create product | ✅ Admin |
| PUT | `/products/{id}` | Update product | ✅ Admin |
| DELETE | `/products/{id}` | Delete product | ✅ Admin |

---

### 🛒 Cart — `/cart`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/cart` | Get cart | ✅ |
| POST | `/cart` | Add item | ✅ |
| PUT | `/cart/item/{productId}` | Update quantity | ✅ |
| DELETE | `/cart/item/{productId}` | Remove item | ✅ |
| DELETE | `/cart/clear` | Clear cart | ✅ |

---

### 📦 Orders — `/order`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/order` | Get orders | ✅ |
| POST | `/order` | Place order | ✅ |
| PUT | `/order/status` | Update status | ✅ Admin |

---

## ✨ Features

### 🔐 Authentication
- JWT-based login system
- Password encryption using BCrypt
- Role-based access (USER / ADMIN)

---

### 🛍️ Product Management
- Public product browsing
- Admin CRUD operations
- Product details with image support

---

### 🛒 Cart System
- Add/remove items
- Update quantity
- Clear cart
- Persistent per user

---

### 📦 Order System
- Place order from cart
- Order history tracking
- Status lifecycle (PLACED → DELIVERED)

---

### 🎨 Frontend UI
- Responsive design
- Product grid with filters
- Cart & Orders UI
- Login & Register pages

---

## 🚀 Getting Started

### 📌 Prerequisites

- Java 17+
- Node.js 18+
- MySQL running locally
- Maven

---

### 1️⃣ Clone Repository

```bash
git clone [<your-repo-link>](https://github.com/Vikram-Kumar-Sahu/E-Commerce-SB/)
cd ecommerce-frontend
