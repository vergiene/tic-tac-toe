import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { WebService } from '../services/web.service';
import { WebGameModel } from '../models/game.model';
import { WebMoveResponseDTO } from '../models/game.model';

@Controller('game')
export class WebController {
  constructor(private webService: WebService) {}

  @Get(':uuid')
  async getGameByID(@Param('uuid') uuid: string): Promise<WebGameModel> {
    return this.webService.getGame(uuid);
  }

  @Post(':uuid')
  async makeMove(
    @Param('uuid') uuid: string,
    @Body() webGame: WebGameModel,
  ): Promise<WebMoveResponseDTO> {
    return this.webService.makeMove(uuid, webGame);
  }

  @Post()
  createGame() {
    return this.webService.createGame();
  }
}
