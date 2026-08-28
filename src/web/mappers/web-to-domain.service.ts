import { Injectable } from '@nestjs/common';
import { Game } from '../../domain/models/game.model';
import { WebGameModel } from '../models/game.model';
import { GameField } from '../../domain/models/board.model';
import { WebMoveResponseDTO } from '../models/game.model';

@Injectable()
export class WebToDomainMapper {
  toWebModel(game: Game): WebGameModel {
    return {
      uuid: game.uuid,
      field: game.field.field,
      status: game.status,
    };
  }

  toMoveResponse(game: Game): WebMoveResponseDTO {
    return {
      status: game.status,
      field: game.field.field,
    };
  }

  fromWebModel(model: WebGameModel): Game {
    return new Game(model.uuid, new GameField(model.field), model.status);
  }
}
