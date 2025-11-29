import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Card {
  id: string;
  word: string;
  meaning: string;
}

export interface GameState {
  gameStatus: "waiting" | "playing" | "finished";
  activeWord: Card | null;
  selectedMeaning: Card | null;
  result: "correct" | "wrong" | null;
  player1Hand: Card[];
  player2Hand: Card[];
  score: { player1: number; player2: number };
  gameLog: string[];

  selectWord: (card: Card) => void;
  selectMeaning: (card: Card) => void;
  resetGame: () => void;
  nextRound: () => void;
  initializeGame: (deck: Card[]) => void;
}

export const useGameStore = create<GameState>()(
  devtools((set, get) => ({
    gameStatus: "waiting",
    activeWord: null,
    selectedMeaning: null,
    result: null,
    player1Hand: [],
    player2Hand: [],
    score: { player1: 0, player2: 0 },
    gameLog: [],

    initializeGame: (deck: Card[]) => {
      // Перемешиваем всю колоду, но сохраняем пары слово-значение
      const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);

      // Игрок 1 получает слова, игрок 2 - соответствующие значения
      const player1Cards = shuffledDeck.map((card) => ({ ...card }));
      const player2Cards = shuffledDeck.map((card) => ({ ...card }));

      set({
        player1Hand: player1Cards,
        player2Hand: player2Cards,
        gameStatus: "playing",
        gameLog: ["Игра началась! Угадай значения молодежных слов!"],
      });
    },

    selectWord: (card: Card) => {
      const state = get();
      if (state.gameStatus !== "playing" || state.activeWord) return;

      set({
        activeWord: card,
        player1Hand: state.player1Hand.filter((c) => c.id !== card.id),
        gameLog: [`Игрок 1 загадал слово: "${card.word}"`, ...state.gameLog],
      });
    },

    selectMeaning: (card: Card) => {
      const state = get();
      if (!state.activeWord || state.result !== null) return;

      const isCorrect = state.activeWord.id === card.id;
      const newScore = { ...state.score };

      if (isCorrect) {
        newScore.player2 += 1;
      }

      set({
        selectedMeaning: card,
        result: isCorrect ? "correct" : "wrong",
        player2Hand: state.player2Hand.filter((c) => c.id !== card.id),
        score: newScore,
        gameLog: [
          `Игрок 2 выбрал: "${card.meaning}" - ${isCorrect ? "ПРАВИЛЬНО!" : "НЕПРАВИЛЬНО"}`,
          ...state.gameLog,
        ],
      });
    },

    nextRound: () => {
      const state = get();
      const hasCards =
        state.player1Hand.length > 0 && state.player2Hand.length > 0;

      set({
        activeWord: null,
        selectedMeaning: null,
        result: null,
        gameStatus: hasCards ? "playing" : "finished",
        gameLog: hasCards
          ? ["Новый раунд!", ...state.gameLog]
          : ["Игра завершена!", ...state.gameLog],
      });
    },

    resetGame: () => {
      set({
        gameStatus: "waiting",
        activeWord: null,
        selectedMeaning: null,
        result: null,
        player1Hand: [],
        player2Hand: [],
        score: { player1: 0, player2: 0 },
        gameLog: ["Игра сброшена"],
      });
    },
  })),
);
