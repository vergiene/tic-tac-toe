import { Injectable } from '@nestjs/common';
import { GameModel } from '../models/game.model';
import { Game } from '../../domain/models/game.model';
import { GameField } from '../../domain/models/board.model';

@Injectable()
export class DomainToDatasourceMapper {
  toModel(domain: Game): GameModel {
    return {
      uuid: domain.uuid,
      field: domain.field.field,
      status: domain.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  toDomain(model: GameModel): Game {
    return new Game(model.uuid, new GameField(model.field), model.status);
  }
}
