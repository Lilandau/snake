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
      const currentHead = snake.snakeHead;
      console.log("current Head: "+ JSON.stringify(currentHead));
      console.log("current snake: "+ JSON.stringify(snake));
      
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
      console.log("next Head: " + JSON.stringify(nextHead));
      snake.snakeHead=nextHead;
      snake.tailValues.push(nextHead.val);
      snake.tailValues=snake.tailValues.slice(-1);
      console.log("new snake: " + JSON.stringify(snake))
    }

    function handleKeydown(e){
      const keyPressed = e.key;
      console.log("keypressed: "+ keyPressed);
      console.log("old Direction: "+ direction)
      switch(keyPressed){
        case ('ArrowUp'):
          setDirection(Direction.UP);
          console.log("go up");
          break;
        case ('ArrowDown'):
          setDirection(Direction.DOWN);
          console.log("go down");
          break;
        case ('ArrowLeft'):
          setDirection(Direction.LEFT);
          console.log("go left");
          break;
        case ('ArrowRight'):
          setDirection(Direction.RIGHT);
          console.log("go right");
          break;
        default:
          break;
      }
      console.log("new Direction: "+ direction)
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
  
