import React, { useState } from "react";
import './Board.css';
import {useInterval} from '../utils.js'

const Direction = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

const BOARD_SIZE=10;


class SnakeCell{
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
  const[counter, setcounter]=useState(0);
  
  useInterval(() => {
    // Your custom logic here
    setcounter(counter + 1);
    moveSnake();
  }, 2000)

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
              <div key={cellIdx} className={`cell ${snake.tailValues.includes(cellValue) ? 'snake-cell' : '' }`}>
                {cellValue}
              </div>
            ))
            }</div>
        ))}
    </div>
    );



    function createSnake(row, col){
      const snakeHead = new SnakeCell(row, col, board[row][col]);
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
          if(nextHead.row>=0){
            nextHead.row--;
          }
          break;
        case Direction.DOWN:
          if(nextHead.row <= BOARD_SIZE){
            nextHead.row++;
          }
          break;
        case Direction.RIGHT:
          if(nextHead.col<=BOARD_SIZE){
            nextHead.col++;
          }
          break;
        case Direction.LEFT:
          if(nextHead.col>=0){
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
  
