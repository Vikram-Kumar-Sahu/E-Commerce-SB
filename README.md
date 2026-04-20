# 👟 KickStore — Shoe E-Commerce Platform

A full-stack premium shoe e-commerce web application built with **React + Vite** on the frontend and **Spring Boot + MySQL** on the backend. Features a dark luxury editorial UI, JWT authentication, real-time cart management, and order tracking.

---

## 📸 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| Backend | Spring Boot 4.0.5, Java 17 |
| Database | MySQL 8.0.41 |
| Auth | JWT (HS256, 24h expiry) |



## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and **npm** 8+
- **Java JDK 17** LTS
- **Maven** 3.6+
- **MySQL** 8.0+

---

### 1. Database Setup

```sql
-- Connect to MySQL
mysql -u root -p

-- Create the database
CREATE DATABASE ecommerce;

-- Tables are auto-created by Hibernate on first run
```

---

### 2. Backend Setup

```bash
# Navigate to the backend folder
cd ecommerce-spring-react

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

> Backend runs at: **http://localhost:8080**

**application.properties** (key settings):

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

### 3. Frontend Setup

```bash
# Navigate to the frontend folder
cd ecommerce-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

> Frontend runs at: **http://localhost:5173**

---

## 🔗 Key URLs

| Service | URL |
|---------|-----|
| Frontend App | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| OpenAPI JSON | http://localhost:8080/v3/api-docs |
| MySQL | localhost:3306 / database: `ecommerce` |

---

## 📡 API Endpoints

### 🔑 Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ✅ | Register new user |
| POST | `/auth/login` | ✅ | Login, receive JWT token |

### 👟 Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/products` | ✅ ADMIN | Create product |
| PUT | `/products/{id}` | ✅ ADMIN | Update product |
| DELETE | `/products/{id}` | ✅ ADMIN | Delete product |

### 🛒 Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/cart` | ✅ | Get user's cart |
| POST | `/cart` | ✅ | Add item to cart |
| PUT | `/cart/item/{productId}?quantity={qty}` | ✅ | Update item quantity |
| DELETE | `/cart/item/{productId}` | ✅ | Remove item |
| DELETE | `/cart/clear` | ✅ | Clear entire cart |

### 📦 Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/order` | ✅ | Place order from cart |
| GET | `/order` | ✅ | Get user's orders |
| PUT | `/order/status` | ✅ ADMIN | Update order status |

### 👤 User
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/user/profile` | ✅ | Get profile |
| PUT | `/user/profile` | ✅ | Update profile |
| DELETE | `/user/profile` | ✅ | Delete account |

---

## 🔐 Authentication

All protected endpoints require a JWT token in the `Authorization` header:
**Login example:**

```bash
curl -X POST http://localhost:8081/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Add to cart example:**

```bash
curl -X POST http://localhost:8081/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"productId": 1, "quantity": 2}'
```

---

## ✨ Features

### Frontend
- ✅ Dark luxury editorial UI (Barlow Condensed font, #C084FC purple accent)
- ✅ Animated hero slider with 4 shoe showcases and per-slide color palettes
- ✅ Product catalog with live search, category filters, and 5 sort options
- ✅ Load more pagination (8 products per load)
- ✅ Shoe size selector (US 6–12) — required before add to cart
- ✅ Cart with quantity controls, coupon code, and free shipping progress bar
- ✅ Order history with 4-step progress tracker and expandable details
- ✅ Split-panel login/register pages with password strength meter
- ✅ JWT token management (localStorage / sessionStorage with Remember Me)
- ✅ No browser alerts — all feedback via inline animations and overlays
- ✅ Fully responsive — mobile-first with `clamp()` fluid sizing

### Backend
- ✅ JWT authentication with BCrypt password hashing (strength 10)
- ✅ Role-based access control (USER / ADMIN)
- ✅ Full CRUD for products (admin only)
- ✅ Shopping cart per user with quantity management
- ✅ Order creation from cart with status lifecycle
- ✅ Swagger / OpenAPI documentation
- ✅ Global exception handling
- ✅ CORS configured for frontend origin

---

## 🧰 Frontend NPM Scripts

```bash
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # Build production bundle → /dist
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## 🔧 Backend Maven Commands

```bash
mvn clean install           # Build the project
mvn spring-boot:run         # Run locally
mvn clean package -DskipTests  # Build JAR for deployment
```

---
