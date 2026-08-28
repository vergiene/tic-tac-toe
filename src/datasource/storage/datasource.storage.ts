import { GameModel } from '../models/game.model';

export class GameStorage {
  private allGames: Map<string, GameModel> = new Map();

  saveGame(game: GameModel): void {
    this.allGames.set(game.uuid, game);
  }

  getGameByID(uuid: string): GameModel | undefined {
    return this.allGames.get(uuid);
  }
}
