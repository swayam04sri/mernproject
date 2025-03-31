Technology Stack
Node.js – Backend runtime

TypeScript – Type safety & maintainability

Express.js – API routing

Prisma – ORM for database management

PostgreSQL / MySQL – Database (can be configured)

Project Structure
bash
Copy
Edit
/backend
  ├── /src
  │   ├── /controllers  # Business logic (e.g., UserController.ts)
  │   ├── /routes       # API routes (e.g., userRoutes.ts)
  │   ├── /middleware   # Error handling & authentication
  │   ├── /prisma       # Prisma schema & migrations
  │   ├── /config       # Database & environment configs
  │   ├── server.ts     # Entry point for Express server
  ├── .env             # Environment variables
  ├── package.json     
  ├── README.md
  ├── tsconfig.json    # TypeScript config
