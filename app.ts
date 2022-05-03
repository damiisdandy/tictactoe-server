import express from "express";
import morgan from "morgan";

// express instance
const app = express();

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


export default app;