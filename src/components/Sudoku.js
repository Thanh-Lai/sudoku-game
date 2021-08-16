import '../styles/Sudoku.css';
import { generateSolution, generatePuzzle } from '../methods/index';
import React, { useEffect, useState } from 'react'

function Sudoku() {
    const [solution, setSolution] = useState([]);
    const [newPuzzle, setPuzzle] = useState([]);
    const [solutionData, setSolutionData] = useState({});
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

    const handleOnChange = (e) => {
        let value = e.target.value;
        const id = e.target.id;
        let input = document.getElementById(id);
        if (!value || value > 9 || value < 1 || !Number.isInteger(Number(value))) {
            input.value = null;
            delete solutionData[id];
        } else {
            input.value = value;
            solutionData[id] = Number(value);
        }
        setSolutionData(solutionData);
    }

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
                                    ? (
                                        <li key={idx2}>
                                            <input
                                                className='solution-inputs'
                                                id={id}
                                                onChange={handleOnChange}
                                            >
                                            </input>
                                        </li>)
                                    : <li className="given" key={idx2}><span id={id} >{box}</span></li>
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
