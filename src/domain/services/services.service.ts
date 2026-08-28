import { Injectable } from '@nestjs/common';
import { Game } from '../models/game.model';
import { GameField } from '../models/board.model';
import { Player } from '../models/player.enum';
import {
  GameStatus,
  IDomainService,
} from '../interfaces/game-service.interface';
import { GameRepository } from '../../datasource/repositories/repositories.service';

@Injectable()
export class DomainService implements IDomainService {
  constructor(private gameRepository: GameRepository) {}

  getNextMove(game: Game): Game {
    const boardCopy = new GameField(game.field.field.map((row) => [...row]));
    const [bestScore, bestMove] = this.minimax(boardCopy, Player.COMPUTER);
    if (bestMove) boardCopy.field[bestMove.row][bestMove.col] = Player.COMPUTER;
    this.printBoard(boardCopy);
    console.log(`AI made a move. Score is ${bestScore}`);
    const gameStatus = this.gameStatusCheck(boardCopy);

    const updatedGame = new Game(game.uuid, boardCopy, gameStatus);
    this.gameRepository.saveGame(updatedGame);

    return updatedGame;
  }

  private minimax(
    field: GameField,
    currPlayer: number,
  ): [number, { row: number; col: number } | null] {
    const status = this.gameStatusCheck(field);
    if (status.isGameOver) {
      if (status.isWinner === Player.HUMAN) return [-10, null];
      if (status.isWinner === Player.COMPUTER) return [10, null];
      if (status.isDraw) return [0, null];
    }
    const availableMoves = this.emptyCells(field);
    let bestScore =
      (currPlayer as Player) === Player.COMPUTER ? -Infinity : Infinity;
    let bestMove: { row: number; col: number } | null = null;

    for (const move of availableMoves) {
      field.field[move.row][move.col] = currPlayer;
      const [score] = this.minimax(field, 3 - currPlayer);
      field.field[move.row][move.col] = Player.EMPTY;

      if (
        (currPlayer as Player) === Player.COMPUTER
          ? score > bestScore
          : score < bestScore
      ) {
        bestScore = score;
        bestMove = move;
      }
    }

    return [bestScore, bestMove];
  }

  private printBoard(field: GameField) {
    for (let i = 0; i < 3; i++) {
      let row = '';
      for (let j = 0; j < 3; j++) {
        if ((field.field[i][j] as Player) === Player.EMPTY) row += 'E ';
        else if ((field.field[i][j] as Player) === Player.HUMAN) row += 'X ';
        else row += 'O ';
      }
      console.log(row);
    }
  }

  private emptyCells(field: GameField): { row: number; col: number }[] {
    const cells: { row: number; col: number }[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if ((field.field[i][j] as Player) === Player.EMPTY) {
          cells.push({ row: i, col: j });
        }
      }
    }
    return cells;
  }

  validateField(currField: GameField, prevField: GameField): boolean {
    let changeCount = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currField.field[i][j] !== prevField.field[i][j]) {
          changeCount++;
          if (
            (currField.field[i][j] as Player) !== Player.HUMAN ||
            (prevField.field[i][j] as Player) !== Player.EMPTY
          ) {
            return false;
          }
        }
      }
    }

    return changeCount === 1;
  }

  gameStatusCheck(newField: GameField): GameStatus {
    for (let i = 0; i < 3; i++) {
      const row = this.checkLine(
        newField.field[i][0],
        newField.field[i][1],
        newField.field[i][2],
      );
      const col = this.checkLine(
        newField.field[0][i],
        newField.field[1][i],
        newField.field[2][i],
      );
      if (col || row) {
        return {
          isGameOver: true,
          isWinner: newField.field[i][i],
          isDraw: false,
        };
      }
    }
    const sideDiagonal: boolean = this.checkLine(
      newField.field[0][2],
      newField.field[2][0],
      newField.field[1][1],
    );
    const mainDiagonal: boolean = this.checkLine(
      newField.field[0][0],
      newField.field[2][2],
      newField.field[1][1],
    );
    if (sideDiagonal || mainDiagonal) {
      return {
        isGameOver: true,
        isWinner: newField.field[1][1],
        isDraw: false,
      };
    }
    if (this.isDraw(newField)) {
      return {
        isGameOver: true,
        isWinner: null,
        isDraw: true,
      };
    }

    return {
      isGameOver: false,
      isWinner: null,
      isDraw: false,
    };
  }

  private checkLine(pos1: number, pos2: number, pos3: number): boolean {
    return (pos1 as Player) !== Player.EMPTY && pos1 === pos2 && pos2 === pos3;
  }

  private isDraw(field: GameField): boolean {
    return !field.field.flat().includes(Player.EMPTY);
  }

  createGame(): Promise<Game> {
    const game = new Game();
    this.gameRepository.saveGame(game);
    return Promise.resolve(game);
  }
}
