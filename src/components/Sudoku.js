import '../styles/Sudoku.css';
import { generateSolution } from '../methods/generateSolution.js';
import React, { useEffect, useState } from 'react'

function Sudoku() {
    const [puzzleData, setState] = useState([]);
    useEffect(() => {
        const board = () => {
            let result = [];
            for(let i = 0; i < 9; i++) {
                result.push(new Array(9).fill(0))
            }
            return result;
        }
          
        const newBoard = board()
        setState(generateSolution(newBoard))
      },[]);
  
    return (
        <div>
            <ul>
                {
                    puzzleData.map((row, idx) => {
                        return (
                            row.map((box, idx) => {
                                return (
                                    box === '-'
                                    ? (<li key={idx}><span></span></li>)
                                    : <li key={idx}><span>{box}</span></li>
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
