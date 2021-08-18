export default function  isValidSudoku(board) {    
    const boxes = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    const cols = [{}, {}, {}, {}, {}, {}, {}, {}, {}]; 
    const rows = [{}, {}, {}, {}, {}, {}, {}, {}, {}];   
    
    for (let i = 0; i < 9; i++) {              
        for (let j = 0; j < 9; j++) {            
            const digit = board[i][j];
            const k = Math.floor(j / 3) + (Math.floor(i / 3) * 3);

            if (boxes[k][digit] || cols[j][digit] || rows[i][digit]) {
                return false;
            }
            boxes[k][digit] = cols[j][digit] = rows[i][digit] = true;       
        }
    }
    
    return true;
};
