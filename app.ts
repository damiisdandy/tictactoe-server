import express from "express";
import morgan from "morgan";
import { PrismaClient } from '@prisma/client';
import cors from "cors";
import routers from "./routers";

// express instance
const app = express();

// prisma client
export const prisma = new PrismaClient();

// check if its in development mode
const mode = process.env.NODE_ENV;
let isDev = false;
console.log(`\n Currently in \u001b[1m\u001b[33m${mode}\u001b[0m mode`);
if (mode === 'development') {
  isDev = true;
}

// middlewares
if (isDev) {
  app.use(morgan('dev'));
}

// body parser
app.use(express.json());

// cors
app.use(cors({
  origin: "*",
  credentials: true,
}))

// REST 
app.use('/game', routers);

export default app;