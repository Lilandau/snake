import React, { useState, useEffect } from "react";
import './Board.css';
import {useInterval, randomIntFromInterval} from '../utils.js'

const Direction = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

const BOARD_SIZE=10;

class Cell{
  constructor(row, col, val){
    this.row = row;
    this.col = col;
    this.val = val;
  }
}

class Snake{
  constructor(snakeHead, length, tailValues){
    this.snakeHead = snakeHead;
    this.length = length;
    this.tailValues= tailValues;
  }
}



function Board() {

  const[board, setBoard] = useState(createBoard(BOARD_SIZE));
  const[snake, setSnake] = useState(createSnake(5,5));
  const[direction, setDirection] = useState(Direction.RIGHT);
  const[fodder, setFodder] = useState(placeFodder(snake.tailValues, BOARD_SIZE));

  const[counter, setcounter]=useState(0);
  
  useInterval(() => {
    // Your custom logic here
    setcounter(counter + 1);
    moveSnake();
  }, 2000)

  useEffect(() => {
    window.addEventListener('keydown', e => {
      handleKeydown(e);
    });
  }, []);

    return (
      <div className="board">
        <div>
          counter: {counter}
        </div>
        <div>
          snakeHead: {snake.snakeHead.val}
        </div>
        {board.map((row, rowIdx)=> (
          <div key={rowIdx} className='row'>{
            row.map((cellValue, cellIdx) => (
              <div key={cellIdx} 
              className={`cell ${snake.tailValues.includes(cellValue) ? 'snake-cell' : '' } ${fodder.val===cellValue ? 'food-cell' : '' }`}>
                {cellValue}
              </div>
            ))
            }</div>
        ))}
    </div>
    );


    function placeFodder(snakeTail, boardSize){
        while(true){
          const row = randomIntFromInterval(0, (boardSize-1));
          const col = randomIntFromInterval(0, (boardSize-1));
          const val = board[row][col];
          if(!snakeTail.includes(val)){
            const fodderCell= new Cell(row, col, val);
            return fodderCell;
          }
        }
    }

    function createSnake(row, col){
      const snakeHead = new Cell(row, col, board[row][col]);
      let snakeTeilValues = new Array(0);
      snakeTeilValues.push(snakeHead.val);
      const snake = new Snake(snakeHead, 1, snakeTeilValues);
      return snake;
    }

    function moveSnake(){
      console.log("current snake"+ JSON.stringify(snake));
      const currentHead = snake.snakeHead;
      
      let nextHead = currentHead;      
      switch(direction) {
        case Direction.UP:
          if(nextHead.row>0){
            nextHead.row--;
          }
          break;
        case Direction.DOWN:
          if(nextHead.row < (BOARD_SIZE-1)){
            nextHead.row++;
          }
          break;
        case Direction.RIGHT:
          if(nextHead.col < (BOARD_SIZE-1)){
            nextHead.col++;
          }
          break;
        case Direction.LEFT:
          if(nextHead.col>0){
            nextHead.col--;
          }
          break;  
        default:
      }
      nextHead.val=board[nextHead.row][nextHead.col];
      snake.snakeHead=nextHead;

      snake.tailValues.push(nextHead.val);

      if((snake.snakeHead.row === fodder.row)
        && (snake.snakeHead.col === fodder.col)){
        console.log("fooder eaten");
        setFodder(placeFodder(snake.tailValues, BOARD_SIZE/2, BOARD_SIZE/2));
        snake.length++;
        console.log("new snake"+ JSON.stringify(snake));
      }else
      {
        snake.tailValues=snake.tailValues.slice(-snake.length);
        console.log("new snake"+ JSON.stringify(snake));
      }
      
    }

    function handleKeydown(e){
      const keyPressed = e.key;
      switch(keyPressed){
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
  }

  function createBoard(size){
    let counter = 1;
    const board =[];
    for(let row= 0; row <size; row++){
      const currentRow=[];
      for(let col= 0; col <size; col++){
        currentRow.push(counter++);
      }
      board.push(currentRow);
    }
    return board;
  }
  
  export default Board;
  
