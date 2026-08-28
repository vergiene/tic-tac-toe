import { GameStatus } from '../../domain/interfaces/game-service.interface';

export interface GameModel {
  uuid: string;
  field: number[][];
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}
