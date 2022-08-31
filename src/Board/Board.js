import React, {useEffect, useState} from "react";
import './Board.css';
import {randomIntFromInterval, useInterval} from '../utils.js'
import Home from "../interface/Home";
import KillScreen from "../interface/KillScreen";

const Direction = {
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
};

let storedSpeed = 0;

const BOARD_SIZE = 10;

class Cell {
    constructor(row, col, val) {
        this.row = row;
        this.col = col;
        this.val = val;
    }
}

class Snake {
    constructor(snakeHead, length, tailValues) {
        this.snakeHead = snakeHead;
        this.length = length;
        this.tailValues = tailValues;
    }
}


function Board() {

    const [newGame, setNewGame] = useState(false);
    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snake, setSnake] = useState(createSnake(5, 5));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [fodder, setFodder] = useState(placeFodder(snake.tailValues, BOARD_SIZE));
    const [delay, setDelay] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [counter, setcounter] = useState(0);

    useInterval(() => {
        // Your custom logic here
        setcounter(counter + 1);
        moveSnake();
    }, delay)

    useEffect(() => {
        window.addEventListener('keydown', e => {
            handleKeydown(e);
        });
    });
    

    useEffect(()=>{
        if(newGame){
            console.log("delay: "+ delay);
            setDelay(storedSpeed);
        }
        if(!newGame){
            setDelay(null);
        }
        if(gameOver){
            setDelay(null);
        }
        if(newGame && gameOver){
            setGameOver(false);
            setNewGame(false);
            setSnake(createSnake(5,5));
            setFodder(placeFodder(snake.tailValues, BOARD_SIZE));
            setcounter(0);
            setDelay(storedSpeed);
        }
    });

 
    return (
        <div className="snakeBoard">
            <div>
                <Home onChoseSpeed={setSpeed} startNewGame={startNewGame}/>
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
                             className={`snakeBordCell ${snake.tailValues.includes(cellValue) ? 'snake-cell' : ''} ${fodder.val === cellValue ? 'food-cell' : ''}`}>

                        </div>
                    ))
                }</div>
            ))}
        </div>
    );


    function startNewGame(){
        setNewGame(true);
    }

    function setSpeed(val) {
        storedSpeed=val;      
    }
    
    function placeFodder(snakeTail, boardSize) {
        while (true) {
            const row = randomIntFromInterval(0, (boardSize - 1));
            const col = randomIntFromInterval(0, (boardSize - 1));
            const val = board[row][col];
            if (!snakeTail.includes(val)) {
                const fodderCell = new Cell(row, col, val);
                return fodderCell;
            }
        }
    }

    function createSnake(row, col) {
        const snakeHead = new Cell(row, col, board[row][col]);
        let snakeTeilValues = new Array(0);
        snakeTeilValues.push(snakeHead.val);
        const snake = new Snake(snakeHead, 1, snakeTeilValues);
        return snake;
    }

    function moveSnake() {
        const currentHead = snake.snakeHead;

        const nextHead = getNextHead(currentHead);


        if (!((currentHead.row === nextHead.row)
            && (currentHead.col === nextHead.col))) {
            snake.snakeHead = nextHead;
            //check if snake moves on fodder-cell or bites itself
            moveOnSnake(snake, nextHead.val);
            moveOnFodder(snake, nextHead.val);
        } else {
            //TODO 1) kill / 2) move to other side
        }
    }

    function moveOnFodder(snake, val) {
        snake.tailValues.push(val);
        if ((snake.snakeHead.row === fodder.row)
            && (snake.snakeHead.col === fodder.col)) {
            setFodder(placeFodder(snake.tailValues, BOARD_SIZE, BOARD_SIZE));
            snake.length++;
        } else {
            snake.tailValues = snake.tailValues.slice(-snake.length);
        }
    }

    function moveOnSnake(snake, nextVal) {

        if (snake.tailValues.includes(nextVal)) {
            console.log("you are killed.");
            setGameOver(true);
            setNewGame(false);
            
        } else {
            snake.tailValues = snake.tailValues.slice(-snake.length);
        }
         
    }

    function getNextHead(currentHead) {
        let nextHead = new Cell(currentHead.row, currentHead.col, currentHead.val);
        switch (direction) {
            case Direction.UP:
                if (nextHead.row > 0) {
                    nextHead.row--;
                }
                break;
            case Direction.DOWN:
                if (nextHead.row < (BOARD_SIZE - 1)) {
                    nextHead.row++;
                }
                break;
            case Direction.RIGHT:
                if (nextHead.col < (BOARD_SIZE - 1)) {
                    nextHead.col++;
                }
                break;
            case Direction.LEFT:
                if (nextHead.col > 0) {
                    nextHead.col--;
                }
                break;
            default:
        }
        nextHead.val = board[nextHead.row][nextHead.col];
        return nextHead;
    }

    function handleKeydown(e) {
        const keyPressed = e.key;
        switch (keyPressed) {
            case ('ArrowUp'):
                setDirection(Direction.UP);
                break;
            case ('ArrowDown'):
                setDirection(Direction.DOWN);
                break;
            case ('ArrowLeft'):
                setDirection(Direction.LEFT);
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

function createBoard(size) {
    let counter = 1;
    const board = [];
    for (let row = 0; row < size; row++) {
        const currentRow = [];
        for (let col = 0; col < size; col++) {
            currentRow.push(counter++);
        }
        board.push(currentRow);
    }
    return board;
}

export default Board;
  
