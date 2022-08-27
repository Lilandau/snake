import React, { useState } from "react";
import './Board.css';
import {useInterval} from '../utils.js'

const Direction = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
};

class LinkedListNode{
  constructor(value){
    this.value= value;
    this.next=null;
  }
}

class LinkedList{
  constructor(value){
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail=node;
  }
}

const BOARD_SIZE=10;

function Board() {

 // const[board, setBoard] = useState( new Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0)),);
  const[board, setBoard] = useState(createBoard(BOARD_SIZE));
  const[snake, setSnake] = useState(new LinkedList(getStartingSnakeLLValue(board)));
  const[snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cell]),);
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
          snakeCell: {snakeCells}
        </div>
        {board.map((row, rowIdx)=> (
          <div key={rowIdx} className='row'>{
            row.map((cellValue, cellIdx) => (
              <div key={cellIdx} className={`cell ${snakeCells.has(cellValue) ? 'snake-cell' : '' }`}>
                {cellValue}
              </div>
            ))
            }</div>
        ))}
    </div>
    );

    function moveSnake(){
      const currentHeadCoords= {
        row : snake.head.value.row,
        col : snake.head.value.col
      }
      console.log("current Coord: "+ currentHeadCoords.col+","+ currentHeadCoords.row);
      console.log("snake: "+ JSON.stringify(snake));
      const nextHeadCoords= currentHeadCoords;
      switch(direction) {
        case Direction.UP:
          if(nextHeadCoords.row<BOARD_SIZE){
            nextHeadCoords.row++;
          }
          break;
        case Direction.DOWN:
          if(nextHeadCoords.row >= 0){
          nextHeadCoords.row--;
          }
          break;
        case Direction.RIGHT:
          if(nextHeadCoords.row<BOARD_SIZE){
          nextHeadCoords.col++;
          }
          break;
        case Direction.LEFT:
          if(nextHeadCoords.col>=0){
          nextHeadCoords.col--;
          }
          break;  
        default:
      }
      console.log("next Coords" + JSON.stringify(nextHeadCoords))
      snake.head.value.row=nextHeadCoords.row;
      snake.head.value.col=nextHeadCoords.col;

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

  function getStartingSnakeLLValue (board) {
    const rowSize = board.length;
    const colSize = board[0].length;
    const startingRow = Math.round(rowSize / 2);
    const startingCol = Math.round(colSize / 2);
    const startingCell = board[startingRow][startingCol];
    return {
      row: startingRow,
      col: startingCol,
      cell: startingCell,
    };
  };





  
  export default Board;
  
