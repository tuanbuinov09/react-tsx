## ReactJS with TypeScript

### Backend:

- To run the backend for the React app, create a `.env` file, (follow the `.env.example`)
- Run `npm install` in `./nodejs-sqlite/` directory to install dependencies.
- Run the app with `npm start` in `./nodejs-sqlite/` directory (default port: 3000)

### Frontend:

- To run the React app, create a `.env` file, (follow the `.env.example`)
- Run `npm install` in `./react-tsx/` directory to install dependencies.
- Run the app with `npm run dev` in `./react-tsx/` directory (default port: 5173)

### Available pages:

- Home: `http://localhost:5173/`
- Login: `http://localhost:5173/login`
- Sign up: `http://localhost:5173/sign-up`
- User: `http://localhost:5173/user` (require authentication)
- Product detail: `http://localhost:5173/products/:productID`
- Checkout: `http://localhost:5173/checkout` (require authentication)
- Orders: `http://localhost:5173/orders` (require admin account)
- Order detail: `http://localhost:5173/orders/:orderID` (require admin account)

admin account:

- email: admin@admin.com
- password: admin
