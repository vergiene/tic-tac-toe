# Tic-Tac-Toe API

Backend для игры «крестики-нолики» на NestJS с ИИ-соперником, играющим по алгоритму **Minimax** (проиграть ему нельзя, максимум — ничья).

## Стек

NestJS, TypeScript, Minimax, in-memory хранилище.

## Архитектура

Clean Architecture в три слоя: `web` (HTTP, контроллеры) → `domain` (игровая логика, minimax) → `datasource` (хранение игр). Слои изолированы и общаются через мапперы.

## Запуск

```bash
git clone https://github.com/vergiene/tic-tac-toe.git
cd tic-tac-toe/src
npm install
npm run start:dev
```

Сервер поднимется на `http://localhost:3000`.

## API

| Метод | Путь | Описание |
|---|---|---|
| `POST` | `/game` | Создать игру |
| `GET` | `/game/:uuid` | Получить состояние игры |
| `POST` | `/game/:uuid` | Сделать ход (тело — поле с одним изменением) |

Поле — матрица 3x3: `0` пусто, `1` человек, `2` ИИ.

## Тестирование через Thunder Client

1. Установить расширение Thunder Client в VS Code
2. Запустить проект
3. Создать новую игру через POST
4. Скопировать uuid и с помощью GET получить данные игры
5. Сделать ход - заменить любой ноль на единицу в теле и отправить его с помощью POST

Пример тела запроса на ход:

```json
{
  "uuid": "<uuid из ответа Create Game>",
  "field": [[1,0,0],[0,0,0],[0,0,0]],
  "status": { "isGameOver": false, "isWinner": null, "isDraw": false }
}
```
