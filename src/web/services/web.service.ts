import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GameRepository } from '../../datasource/repositories/repositories.service';
import { WebToDomainMapper } from '../mappers/web-to-domain.service';
import { WebGameModel } from '../models/game.model';
import { DomainService } from '../../domain/services/services.service';
import { Game } from '../../domain/models/game.model';
import { Player } from '../../domain/models/player.enum';
import { GameField } from '../../domain/models/board.model';
import { WebMoveResponseDTO } from '../models/game.model';

@Injectable()
export class WebService {
  constructor(
    private storage: GameRepository,
    private webMapper: WebToDomainMapper,
    private domainService: DomainService,
  ) {}

  async getGame(uuid: string): Promise<WebGameModel> {
    const game = await this.storage.getGameByID(uuid);
    if (!game) {
      throw new NotFoundException(`Game with UUID ${uuid} doesn't exist`);
    }
    return this.webMapper.toWebModel(game);
  }

  async makeMove(
    uuid: string,
    webGame: WebGameModel,
  ): Promise<WebMoveResponseDTO> {
    const prevGame = await this.storage.getGameByID(uuid);
    const gameState = this.domainService.gameStatusCheck(prevGame.field);
    if (gameState.isGameOver) {
      throw new BadRequestException(
        gameState.isDraw
          ? 'Game is draw!'
          : `Game Over. The winner is ${gameState.isWinner as Player}`,
      );
    }
    const currGame = new Game(uuid, new GameField(webGame.field), gameState);
    if (!this.domainService.validateField(currGame.field, prevGame.field)) {
      throw new BadRequestException('Invalid move!');
    }
    const updateGame = this.domainService.getNextMove(currGame);
    return this.webMapper.toMoveResponse(updateGame);
  }

  async createGame() {
    const game = await this.domainService.createGame();
    return this.webMapper.toWebModel(game);
  }
}
