import { GameStatus } from '../../domain/interfaces/game-service.interface';

export class WebGameModel {
  uuid: string;
  status: GameStatus;
  field: number[][];
}

export class WebMoveResponseDTO {
  status: GameStatus;
  field: number[][];
}
