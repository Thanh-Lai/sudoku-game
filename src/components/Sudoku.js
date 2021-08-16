import '../styles/Sudoku.css';
import { generateSolution, generatePuzzle } from '../methods/index';
import React, { useEffect, useState } from 'react'

function Sudoku() {
    const [solutionData, setSolution] = useState([]);
    const [newPuzzle, setPuzzle] = useState([]);
    useEffect(() => {
        const board = () => {
            let result = [];
            for(let i = 0; i < 9; i++) {
                result.push(new Array(9).fill(0));
            }
            return result;
        }
          
        const newBoard = board();
        const solution = generateSolution(newBoard);
        setSolution(solution);
        setPuzzle(generatePuzzle(solution));
      },[]);
    return (
        <div>
            <ul>
                {
                    newPuzzle.map((row, idx1) => {
                        return (
                            row.map((box, idx2) => {
                                const id = idx1 + '-' + idx2;
                                return (
                                    box === '-'
                                    ? (<li key={idx2}><span id={id} ></span></li>)
                                    : <li key={idx2}><span id={id} >{box}</span></li>
                                )
                            })
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Sudoku;
