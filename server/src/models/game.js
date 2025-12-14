import { v4 as uuidv4 } from "uuid";
import { generateDeck } from "../utils/deckGenerator.js";

export class Game {
  constructor() {
    this.id = uuidv4();
    this.players = [];
    this.status = "waiting";
    this.currentRound = 0;
    this.maxPlayers = 2;
    this.deck = generateDeck();
    this.activeWord = null;
    this.selectedMeaning = null;
    this.result = null;
    this.scores = { words: 0, meanings: 0 };
    this.createdAt = new Date();
  }

  // Добавление игроков в игру
  addPlayer(socketId, playerName, requestedRole) {
    if (this.players.length >= this.maxPlayers) throw new Error("Game is full");
    const role =
      this.players.length === 0
        ? requestedRole
        : this.players[0].role === "word"
        ? "meaning"
        : "word";
    const player = {
      id: socketId,
      name: playerName,
      role,
      hand: [],
      isReady: false,
    };
    this.players.push(player);
    if (this.players.length === this.maxPlayers) {
      this.dealCards();
      this.status = "playing";
    }
    return player;
  }

  // Проверка и обновление статуса игры
  checkAndUpdateStatus() {
    const ready = this.players.length === this.maxPlayers;
    if (ready && this.status !== "playing") {
      this.status = "playing";
      this.dealCards();
    } else if (!ready && this.status === "playing") {
      this.status = "waiting";
    }
    return this.status;
  }

  // Раздача карт игрокам
  dealCards() {
    const wordPlayer = this.players.find((p) => p.role === "word");
    const meaningPlayer = this.players.find((p) => p.role === "meaning");
    if (!wordPlayer || !meaningPlayer) return;
    wordPlayer.hand = this.deck.map((card) => ({
      id: card.id,
      word: card.word,
      type: "word",
    }));
    meaningPlayer.hand = this.deck.map((card) => ({
      id: card.id,
      meaning: card.meaning,
      type: "meaning",
    }));
  }

  // Удаление игрока из игры
  removePlayer(socketId) {
    this.players = this.players.filter((player) => player.id !== socketId);
    if (this.players.length < this.maxPlayers) {
      this.status = "waiting";
      this.resetGame();
    }
  }

  selectWord(socketId, cardId) {
    if (this.status !== "playing" || this.activeWord) return null;
    const player = this.players.find(
      (p) => p.id === socketId && p.role === "word"
    );
    if (!player) return null;
    const card = player.hand.find((c) => c.id === cardId);
    if (!card) return null;
    const fullCard = this.deck.find((c) => c.id === cardId);
    if (!fullCard) return null;
    this.activeWord = fullCard;
    return fullCard;
  }

  selectMeaning(socketId, cardId) {
    if (!this.activeWord || this.result !== null) return null;
    const player = this.players.find(
      (p) => p.id === socketId && p.role === "meaning"
    );
    if (!player) return null;
    const card = player.hand.find((c) => c.id === cardId);
    if (!card) return null;

    this.selectedMeaning = card;
    const isCorrect = this.activeWord.id === cardId;
    this.result = isCorrect ? "correct" : "wrong";

    if (isCorrect) {
      // Правильный ответ
      this.scores.meanings += 1;

      player.hand = player.hand.filter((c) => c.id !== cardId);

      const wordPlayer = this.players.find((p) => p.role === "word");
      if (wordPlayer) {
        wordPlayer.hand = wordPlayer.hand.filter((c) => c.id !== cardId);
      }
    } else {
      // Неправильный ответ
      this.scores.words += 1;
    }

    return { card, result: this.result, scores: { ...this.scores } };
  }

  nextRound() {
    const hasCards = this.players.every((player) => player.hand.length > 0);
    this.activeWord = null;
    this.selectedMeaning = null;
    this.result = null;
    this.currentRound += 1;
    if (!hasCards) this.status = "finished";
    return {
      status: this.status,
      currentRound: this.currentRound,
      scores: { ...this.scores },
      isGameFinished: !hasCards,
    };
  }

  resetGame() {
    this.status = "waiting";
    this.currentRound = 0;
    this.activeWord = null;
    this.selectedMeaning = null;
    this.result = null;
    this.scores = { words: 0, meanings: 0 };
    this.deck = generateDeck();
    if (this.players.length === this.maxPlayers) this.dealCards();
  }

  getGameState() {
    this.checkAndUpdateStatus();
    return {
      id: this.id,
      status: this.status,
      players: this.players.map((player) => ({
        id: player.id,
        name: player.name,
        role: player.role,
        handSize: player.hand.length,
        isReady: player.isReady,
      })),
      activeWord: this.activeWord,
      selectedMeaning: this.selectedMeaning,
      result: this.result,
      scores: { ...this.scores },
      currentRound: this.currentRound,
    };
  }

  getPlayerHand(socketId) {
    return this.players.find((p) => p.id === socketId)?.hand || [];
  }

  getGameResults() {
    const wordPlayer = this.players.find((p) => p.role === "word");
    const meaningPlayer = this.players.find((p) => p.role === "meaning");
    const { words, meanings } = this.scores;
    return {
      scores: this.scores,
      winner:
        words > meanings ? "words" : meanings > words ? "meanings" : "draw",
      wordPlayer: wordPlayer?.name,
      meaningPlayer: meaningPlayer?.name,
      totalRounds: this.currentRound,
    };
  }
}
