import { GameField } from './board.model';
import { GameStatus } from '../interfaces/game-service.interface';

export class Game {
  readonly uuid: string;
  readonly status: GameStatus;
  public field: GameField;

  constructor(uuid?: string, field?: GameField, status?: GameStatus) {
    this.uuid = uuid || crypto.randomUUID();
    this.status = status || this.getInitialStatus();
    this.field = field || new GameField();
  }

  private getInitialStatus(): GameStatus {
    return {
      isGameOver: false,
      isWinner: null,
      isDraw: false,
    };
  }
}
