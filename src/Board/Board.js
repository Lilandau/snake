import React, {useEffect, useState} from "react";
import './Board.css';
import {randomIntFromInterval, useInterval} from '../utils.js'
import NewGameDialog from "../interface/NewGame";
import KillScreen from "../interface/KillScreen";
import {BOARD_SIZE, Cell, createBoard, Direction, setStoredSpeed, storedSpeed} from "./gameUtils";


class Snake {
    constructor(snakeHead, length, tailValues) {
        this.snakeHead = snakeHead;
        this.length = length;
        this.tailValues = tailValues;
    }
}

function Board() {

    const [showNewGameDialog, setShowNewGameDialog] = useState(true);
    const [newGame, setNewGame] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snake, setSnake] = useState(createSnake(5, 5));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [fodder, setFodder] = useState(placeFodder(snake.tailValues, BOARD_SIZE));
    const [delay, setDelay] = useState(null);
    const [counter, setcounter] = useState(0);

    useEffect(() => {
        console.log("gameover: " + gameOver)
        if (gameOver) {
            setDelay(null);
        }
    }, [gameOver])

    useEffect(() => {
        console.log("newGame: " + newGame)
        if (newGame) {
            setDelay(storedSpeed);
            setShowNewGameDialog(false);
            createSnake(5, 5);
            setNewGame(false);
        }
    }, [newGame])


    useEffect(() => {
        window.addEventListener('keyup', e => {
            handleKeydown(e);
        });
    }, []);


    useInterval(() => {
        // Your custom logic here
        setcounter(counter + 1);
        moveSnake();
    }, delay)


    return (
        <div className="snakeBoard">
            <div>
                <NewGameDialog onChoseSpeed={setStoredSpeed} startNewGame={startGame} handleStop={handleStop}
                               showNewGameDialog={showNewGameDialog}/>
            </div>
            <div>
                <KillScreen gameOver={gameOver} startNewGame={startNewGame}/>
            </div>
            <div>
                Score: {snake.length}
            </div>
            <div className={'stopButton'}
                 onClick={handleStop}>
                <button>STOP</button>
            </div>

            {board.map((row, rowIdx) => (
                <div key={rowIdx} className='snakeBoardRow'>{
                    row.map((cellValue, cellIdx) => (
                        <div key={cellIdx}
                             className={`snakeBordCell ${snake.tailValues.includes(cellValue) ? 'snake-cell' : ''} ${fodder.val === cellValue ? 'food-cell' : ''}
                             ${snake.snakeHead.val === cellValue ? 'snake-head' : ''}`}>
                        </div>
                    ))
                }</div>
            ))}
        </div>
    );

    function startNewGame() {
        setShowNewGameDialog(true);
    }

    function startGame() {
        setSnake(createSnake(5, 5));
        setNewGame(true);
        setGameOver(false);
    }

    function placeFodder(snakeTail, boardSize) {
        while (true) {
            const row = randomIntFromInterval(0, (boardSize - 1));
            const col = randomIntFromInterval(0, (boardSize - 1));
            const val = board[row][col];
            if (!snakeTail.includes(val)) {
                return new Cell(row, col, val);
            }
        }
    }

    function createSnake(row, col) {
        const snakeHead = new Cell(row, col, board[row][col]);
        let snakeTeilValues = new Array(0);
        snakeTeilValues.push(snakeHead.val);
        return new Snake(snakeHead, 1, snakeTeilValues);
    }

    function moveSnake() {
        const currentHead = snake.snakeHead;
        const nextHead = getNextHead(currentHead);
        if (checkMoveAgainstWall(nextHead) || checkMoveOnSnake(snake, board[nextHead.row][nextHead.col])) {
            setGameOver(true);
            setNewGame(false);
        } else {
            nextHead.val = board[nextHead.row][nextHead.col];
        }
        snake.snakeHead = nextHead;
        //check if snake moves on fodder-cell or bites itself
        moveOn(snake);
        moveOnFodder(snake, nextHead.val);

    }

    function checkMoveAgainstWall(nextHead) {
        if (nextHead.val === -1) {
            console.log("you were killed by crashing the wall");
            return true;
        }
    }

    function checkMoveOnSnake(snake, nextVal) {
        if (snake.tailValues.includes(nextVal)) {
            console.log("you were killed by eating yourself");
            return true;
        }
    }

    function moveOnFodder(snake, val) {
        snake.tailValues.push(val);
        if ((snake.snakeHead.row === fodder.row)
            && (snake.snakeHead.col === fodder.col)) {
            setFodder(placeFodder(snake.tailValues, BOARD_SIZE));
            snake.length++;
        } else {
            snake.tailValues = snake.tailValues.slice(-snake.length);
        }
    }

    function moveOn(snake) {
        snake.tailValues = snake.tailValues.slice(-snake.length);
    }

    function getNextHead(currentHead) {
        let nextHead = new Cell(currentHead.row, currentHead.col, currentHead.val);
        switch (direction) {
            case Direction.UP:
                nextHead.row--;
                break;
            case Direction.DOWN:
                nextHead.row++;
                break;
            case Direction.RIGHT:
                nextHead.col++;
                break;
            case Direction.LEFT:
                nextHead.col--;
                break;
            default:
        }
        if ((nextHead.row >= 0 && nextHead.row < BOARD_SIZE) &&
            (nextHead.col >= 0 && nextHead.col < BOARD_SIZE)) {
            nextHead.val = board[nextHead.row][nextHead.col];
        } else {
            nextHead.val = -1
        }
        return nextHead;
    }

    function handleKeydown(e) {
        const keyPressed = e.key;
        switch (keyPressed) {
            case ('ArrowUp'):
                setDirection(Direction.UP)
                break;
            case ('ArrowDown'):
                setDirection(Direction.DOWN)
                break;
            case ('ArrowLeft'):
                setDirection(Direction.LEFT)
                break;
            case ('ArrowRight'):
                setDirection(Direction.RIGHT);
                break;
            default:
               break;
        }
    }

    function handleStop() {
        console.log("stop clicked");
        setDelay(null);
    }

}


export default Board;

