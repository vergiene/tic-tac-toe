import { Injectable, NotFoundException } from '@nestjs/common';
import { GameStorage } from '../storage/datasource.storage';
import { DomainToDatasourceMapper } from '../mappers/domain-to-datasource.service';
import { Game } from '../../domain/models/game.model';

@Injectable()
export class GameRepository {
  constructor(
    private storage: GameStorage,
    private mapper: DomainToDatasourceMapper,
  ) {}

  saveGame(game: Game): void {
    const gameModel = this.mapper.toModel(game);
    this.storage.saveGame(gameModel);
  }

  getGameByID(uuid: string): Promise<Game> {
    const gameModel = this.storage.getGameByID(uuid);
    if (!gameModel) {
      throw new NotFoundException('game does not exist');
    }
    return Promise.resolve(this.mapper.toDomain(gameModel));
  }
}
