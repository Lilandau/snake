import React, { useState, useEffect, useRef } from "react";
import './Board.css';
import {useInterval} from '../utils.js'

class LinkedListNode{
  constructor(value){
    this.value= value;
    this.next=null;
  }
}

class SingleLinkedList{
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
  const[snakeCells, setSnakeCells] = useState(new Set([44]));
  const[snake, setSnake] = useState(new SingleLinkedList(44));

  const[counter, setcounter]=useState(0);
  
  useInterval(() => {
    // Your custom logic here
    setcounter(counter + 1);
    let currentCell = snakeCells.keys[0];
    console.log(snakeCells.entries()[0]);
    setSnakeCells(snakeCells.add(currentCell+1));
  }, 1000)

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
  
