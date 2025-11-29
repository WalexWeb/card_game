import { Game } from "../models/game.js";

class GameManager {
  constructor() {
    this.games = new Map();
    this.playerGameMap = new Map();
  }

  createGame() {
    const game = new Game();
    this.games.set(game.id, game);
    return game;
  }

  getGame(gameId) {
    return this.games.get(gameId);
  }

  joinGame(socketId, playerName, requestedRole) {
    let game =
      Array.from(this.games.values()).find(
        (g) => g.status === "waiting" && g.players.length < g.maxPlayers
      ) || this.createGame();
    const player = game.addPlayer(socketId, playerName, requestedRole);
    this.playerGameMap.set(socketId, game.id);
    return { game, player };
  }

  leaveGame(socketId) {
    const gameId = this.playerGameMap.get(socketId);
    if (!gameId) return null;
    const game = this.getGame(gameId);
    if (!game) return null;
    game.removePlayer(socketId);
    this.playerGameMap.delete(socketId);
    if (game.players.length === 0) this.games.delete(gameId);
    return game;
  }

  getPlayerGame(socketId) {
    const gameId = this.playerGameMap.get(socketId);
    return gameId ? this.getGame(gameId) : null;
  }
}

const gameManager = new GameManager();

const gameHandler = (io, socket) => {
  // Присоединение к игре
  socket.on("join_game", (data, callback) => {
    try {
      const { playerName, role } = data;
      const { game, player } = gameManager.joinGame(
        socket.id,
        playerName,
        role
      );
      socket.join(game.id);
      game.checkAndUpdateStatus();
      const gameState = game.getGameState();
      const playerHand = game.getPlayerHand(socket.id);
      io.to(game.id).emit("game_state_update", gameState);
      socket.emit("player_hand_update", playerHand);
      callback?.({ success: true, gameId: game.id, playerRole: player.role });
    } catch (error) {
      callback?.({ success: false, error: error.message });
    }
  });

  // Выбор слова
  socket.on("select_word", (data, callback) => {
    try {
      const { cardId } = data;
      const game = gameManager.getPlayerGame(socket.id);
      if (!game) throw new Error("Game not found");
      const selectedWord = game.selectWord(socket.id, cardId);
      if (!selectedWord) throw new Error("Cannot select word");
      io.to(game.id).emit("word_selected", {
        word: selectedWord,
        playerId: socket.id,
      });
      io.to(game.id).emit("game_state_update", game.getGameState());
      game.players.forEach((player) =>
        io
          .to(player.id)
          .emit("player_hand_update", game.getPlayerHand(player.id))
      );
      callback?.({ success: true });
    } catch (error) {
      callback?.({ success: false, error: error.message });
    }
  });

  // Выбор значения
  socket.on("select_meaning", (data, callback) => {
    try {
      const { cardId } = data;
      const game = gameManager.getPlayerGame(socket.id);
      if (!game) throw new Error("Game not found");
      const result = game.selectMeaning(socket.id, cardId);
      if (!result) throw new Error("Cannot select meaning");
      io.to(game.id).emit("meaning_selected", {
        meaning: result.card,
        result: result.result,
        scores: result.scores,
        playerId: socket.id,
      });
      io.to(game.id).emit("game_state_update", game.getGameState());
      game.players.forEach((player) =>
        io
          .to(player.id)
          .emit("player_hand_update", game.getPlayerHand(player.id))
      );
      callback?.({ success: true, result: result.result });
    } catch (error) {
      callback?.({ success: false, error: error.message });
    }
  });

  // Следующий раунд
  socket.on("next_round", (callback) => {
    try {
      const game = gameManager.getPlayerGame(socket.id);
      if (!game) throw new Error("Game not found");
      const roundResult = game.nextRound();
      io.to(game.id).emit("round_update", roundResult);
      io.to(game.id).emit("game_state_update", game.getGameState());
      callback?.({ success: true, ...roundResult });
    } catch (error) {
      callback?.({ success: false, error: error.message });
    }
  });

  // Новая игра
  socket.on("reset_game", (callback) => {
    try {
      const game = gameManager.getPlayerGame(socket.id);
      if (!game) throw new Error("Game not found");
      game.resetGame();
      game.dealCards();
      io.to(game.id).emit("game_reset", game.getGameState());
      game.players.forEach((player) =>
        io
          .to(player.id)
          .emit("player_hand_update", game.getPlayerHand(player.id))
      );
      callback?.({ success: true });
    } catch (error) {
      callback?.({ success: false, error: error.message });
    }
  });

  // Отсоединение от игры
  socket.on("leave_game", () => {
    const game = gameManager.leaveGame(socket.id);
    if (game) {
      socket.leave(game.id);
      io.to(game.id).emit("player_left", { playerId: socket.id });
      io.to(game.id).emit("game_state_update", game.getGameState());
    }
  });

  // Обработка отключения
  socket.on("disconnect", () => {
    const game = gameManager.leaveGame(socket.id);
    if (game) {
      io.to(game.id).emit("player_disconnected", { playerId: socket.id });
      io.to(game.id).emit("game_state_update", game.getGameState());
    }
  });
};

export default gameHandler;
