import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { Server } from "socket.io";
import dotenv from "dotenv";
import gameHandler from "./socket/gameHandler.js";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(helmet());

app.use(compression());

dotenv.config();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  gameHandler(io, socket);

  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, reason);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Card Game API!");
});

const PORT = process.env.PORT || 8600;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
