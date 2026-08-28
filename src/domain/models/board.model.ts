// Модель игрового поля — целочисленная матрица 3x3
export class GameField {
  field: number[][]; // 0 - пусто, 1 - человек, 2 - ИИ

  constructor(
    field: number[][] = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ) {
    this.field = field;
  }
}
