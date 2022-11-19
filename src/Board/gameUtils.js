export class Cell {
    constructor(row, col, val) {
        this.row = row;
        this.col = col;
        this.val = val;
    }
}

export let storedSpeed = 350; //normal speed as default

export const BOARD_SIZE = 10;

export const Direction = {
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
};

export function createBoard(size) {
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

export function setStoredSpeed(val){
    console.log("stored speed was set to: " + val);
    storedSpeed=val;
}

