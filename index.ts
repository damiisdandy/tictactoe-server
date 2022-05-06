import dotenv from "dotenv";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import app, { prisma } from "./app";
import { PORT } from "./config";

// configure .env
dotenv.config({ path: path.resolve(__dirname, './.env') });

// Start Server
const server = app.listen(PORT, () => {
  console.log(`\n REST Server is ready at http://localhost:${PORT}/api/v1 🌏`);
});

// web socket
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on("connection", (socket) => {
  socket.on("joinGame", async ({ opponent, game }) => {
    console.log("Client joined game");
    socket.join(game);
    // if opponent is new here add his/her to game
    if (opponent) {
      const { creator } = await prisma.game.update({
        where: {
          code: game,
        },
        data: {
          opponent,
        }
      });
      io.sockets.in(game).emit('players', {
        creator,
        opponent,
      })
    }
  })
  socket.on("move", async ({ currentBoard, id }) => {
    const { board } = await prisma.game.update({
      where: {
        code: id,
      },
      data: {
        board: currentBoard,
      }
    });
    io.sockets.in(id).emit('newBoard', board);
  });
  socket.on("reset", async ({ id }) => {
    const { board } = await prisma.game.update({
      where: {
        code: id,
      },
      data: {
        board: `[[null, null, null],[null, null, null],[null, null, null]]`,
      }
    });
    io.sockets.in(id).emit('newGame', board);
  });
});
