

```markdown
# Real-Time Product Management Dashboard – Backend

## Overview

This is the **backend** for the **Real-Time Product Management Dashboard**.  
Built using **Node.js + Express (TypeScript)**, it provides:

- **JWT-based authentication**
- REST API endpoints for **products, users, and profile**
- Integration with **Firebase Firestore** for storing and fetching product data in real-time
- Middleware for authentication and validation  

The backend works in tandem with the frontend (Next.js) to deliver a **real-time product management experience**.

---

## Tech Stack

- **Node.js + Express (TypeScript)** – Server and API
- **Firebase Firestore** – Real-time database
- **JWT (jsonwebtoken)** – Authentication with HTTP-only cookies
- **bcryptjs** – Password hashing
- **Cors** – Cross-origin requests handling
- **cookie-parser** – Handling cookies
- **ts-node-dev** – TypeScript development server
- **ESLint + Prettier** – Code quality and formatting

---

## Project Structure

```

src/
├── api/
│   ├── auth/                  # Authentication service and validation
│   │   ├── service.ts
│   │   └── validation.ts
│   └── products/              # Product APIs and validation
│       ├── service.ts
│       └── validation.ts
├── config/
│   ├── firebase.ts            # Firebase initialization
│   └── firebase-key.json      # Firebase service account (should be secured)
├── middleware/
│   └── auth.ts                # JWT authentication middleware
├── routes/
│   ├── index.ts               # Main route aggregator
│   ├── products.route.ts      # Product endpoints
│   ├── profile.route.ts       # Profile endpoints
│   └── user.route.ts          # User endpoints
├── types/                     # TypeScript type definitions
│   ├── express.d.ts
│   ├── product.ts
│   └── user.ts
├── utils/
│   └── jwt.ts                 # JWT token creation and verification
├── app.ts                     # Express app configuration
└── server.ts                  # Entry point for starting the server

````

---

## API Endpoints

### Auth

- **POST** `/api/auth/login` – Login with demo credentials, returns JWT in HTTP-only cookie
- **POST** `/api/auth/logout` – Clears JWT cookie

### Products

- **GET** `/api/products` – Fetch all products (supports pagination)
- **POST** `/api/products` – Add a new product
- **PUT** `/api/products?id={productId}` – Update a product
- **DELETE** `/api/products?id={productId}` – Delete a product

### Users & Profile

- **GET** `/api/profile` – Fetch current user profile
- **GET** `/api/user` – Fetch users (demo purpose)

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <backend-repo-url>
cd <repo-folder>
````

2. Install dependencies:

```bash
npm install
```

3. Create `.env` in the root folder with:

```env
FRONTEND_URL=http://localhost:3000
JWT_SECRET=<your_jwt_secret>
```

4. Ensure `firebase-key.json` is present in `src/config` with your Firebase service account credentials.

5. Run the development server:

```bash
npm run dev
```

Server runs at `http://localhost:3001` (or the port you configure).

---

## Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only server.ts"
}
```

---

## Notes

* The backend uses **Firebase Firestore** for all product data.
* All product changes are reflected in real-time on the frontend via Firestore listeners.
* JWT authentication is enforced on protected routes using **auth middleware**.
* Use `ts-node-dev` for fast TypeScript development with automatic restarts.
* API validation is implemented using separate `validation.ts` files in each module.

---

## Live Demo

> [API live URL ](https://eagle-server-rho.vercel.app/)

---

# eagle-server
