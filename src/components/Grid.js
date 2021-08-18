import React from 'react'

function Grid({puzzle, handleOnChange}) {
    return (
        <ul>
            {
                puzzle.map((row, idx1) => {
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
    )
}

export default Grid;
