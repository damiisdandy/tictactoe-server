import dotenv from "dotenv";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import app from "./app";
import { PORT } from "./config";

// configure .env
dotenv.config({ path: path.resolve(__dirname, './.env') });

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected")
})

// Start Server
server.listen(PORT, () => {
  console.log(`\n REST Server is ready at http://localhost:${PORT}/api/v1 🌏`);
});