import { GameField } from '../models/board.model';
import { Game } from '../models/game.model';

export interface GameStatus {
  isGameOver: boolean;
  isWinner: number | null; // 0 - ничья, 1 - человек, 2 - ИИ
  isDraw: boolean;
}

export interface IDomainService {
  getNextMove(game: Game): Game;
  validateField(currField: GameField, prevField: GameField): boolean;
  gameStatusCheck(newField: GameField): GameStatus;
}
