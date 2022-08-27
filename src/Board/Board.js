import React, { useState } from "react";
import './Board.css';

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

    return (
      <div className="board">
        {board.map((row, rowIdx)=> (
          <div key={rowIdx} className='row'>{
            row.map((cellValue, cellIdx) => (
              <div key={cellIdx} className={`cell ${false ? 'food-cell' : '' }`}>
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
  
