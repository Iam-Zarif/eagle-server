
## Tech Stacks

- **Runtime & Framework:** Node.js, Express 5
- **Database:** Firebase (Firestore)
- **Authentication:** JWT 
- **Security:** bcryptjs, cookie-parser, cors 
- **Dev Tools:** STypeScript 5, ts-node-dev, ESLint, Prettier




## One click run
It will run into http://localhost:3000

```bash
git clone https://github.com/Iam-Zarif/eagle-server.git
cd eagle-3d-streaming-server
npm install
npm run dev

```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`  
`NODE_ENV`  
`FRONTEND_URL`  
`JWT`  


`src/config/firebase-key.json` - file



---

## API Reference
#### Login

```http
POST /api/login
```

| Parameter  | Type   | Description                 |
| :--------- | :----- | :-------------------------- |
| `username` | string | **Required**. User username |
| `password` | string | **Required**. User password |

* **Required Cookie:** No (returns cookie on success)


#### View Profile

```http
GET /api/profile
```

* **Required Cookie:** Yes

---
#### Get All Products

```http
GET /api/product
```

* **Required Cookie:** Yes

---

#### Get Product by ID

```http
GET /api/product?id={productId}
```

| Parameter | Type   | Description              |
| :-------- | :----- | :----------------------- |
| `id`      | string | **Required**. Product ID |

* **Required Cookie:** Yes

---

#### Add Product

```http
POST /api/product
```

| Parameter | Type   | Description                        |
| :-------- | :----- | :--------------------------------- |
| `body`    | object | Product details (name, description, price, quantity, status) |

* **Required Cookie:** Yes

---

#### Update Product

```http
PUT /api/product?id={productId}
```

| Parameter | Type   | Description              |
| :-------- | :----- | :----------------------- |
| `id`      | string | **Required**. Product ID |
| `body`    | object | Updated product details  |

* **Required Cookie:** Yes

---

#### Delete Product

```http
DELETE /api/product?id={productId}
```

| Parameter | Type   | Description              |
| :-------- | :----- | :----------------------- |
| `id`      | string | **Required**. Product ID |

* **Required Cookie:** Yes

---







# Check Live

A real-time product management dashboard built with Next.js, React, Redux, and Firebase.  

🌐 **Live Demo:** [Frontend Web](https://eagle-3d-streaming.web.app)


## Server / API URL

The backend API is hosted here: [API Server](https://eagle-server-green.vercel.app)