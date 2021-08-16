const rowSafe = (puzzleArray, emptyCell, num) => {
    return puzzleArray[ emptyCell.rowIndex ].indexOf(num) === -1;
}
   
const colSafe = (puzzleArray, emptyCell, num) => {
    return !puzzleArray.some(row => row[ emptyCell.colIndex ] === num );
}
   
const boxSafe = (puzzleArray, emptyCell, num) => {
    const boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3);
    const boxStartCol = emptyCell.colIndex - (emptyCell.colIndex % 3);
    let safe = true

    for ( let boxRow of [0,1,2] ) {
        for ( let boxCol of [0,1,2] ) {
            if ( puzzleArray[boxStartRow + boxRow][boxStartCol + boxCol] === num ) { 
            safe = false;
            }
        }
    }
    return safe;
}

const safeToPlace = ( puzzleArray, emptyCell, num ) => {
    return rowSafe(puzzleArray, emptyCell, num) && 
    colSafe(puzzleArray, emptyCell, num) && 
    boxSafe(puzzleArray, emptyCell, num);
}

const nextEmptyCell = puzzleArray => {
    const emptyCell = {rowIndex: "", colIndex: ""};

    puzzleArray.forEach( (row, rowIndex) => {
    if (emptyCell.colIndex !== "" ) return;

    let firstZero = row.find( col => col === 0);
    
    if (firstZero === undefined) return; 
    emptyCell.rowIndex = rowIndex;
    emptyCell.colIndex = row.indexOf(firstZero);
    })
    
    if (emptyCell.colIndex !== "") return emptyCell;
    return false;
}

const shuffle = array => {
    let newArray = [...array];
    for ( let i = newArray.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ newArray[ i ], newArray[ j ] ] = [ newArray[ j ], newArray[ i ] ];
    }
    return newArray;
}

let counter = 0;

export default function generateSolution(startingBoard) {
    const emptyCell = nextEmptyCell(startingBoard);
    if (!emptyCell) return startingBoard;

    for (let num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]) ) {   
        counter++;
        if ( counter > 20_000_000 ) throw new Error ("Recursion Timeout");

        if ( safeToPlace( startingBoard, emptyCell, num) ) {
            startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = num;
            if ( generateSolution(startingBoard) ) return startingBoard;
            startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = 0;
        }
    }
    return false ;
}
