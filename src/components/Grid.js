import React from 'react'
import MiniGrid from './MiniGrid';

function Grid({puzzle, handleOnChange, pause}) {
    return (
        <ul hidden id="main-grid">
            {
                puzzle.map((row, idx1) => {
                    return (
                        row.map((box, idx2) => {
                            const id = idx1 + '-' + idx2;
                            let pauseClass = '';
                            let disabled = false;
                            if (pause) {
                                pauseClass = 'blurGrid';
                                disabled = true;
                            }
                            return (
                                box === '-'
                                ? (
                                    <li className={`main-list ${pauseClass}`} key={idx2}>
                                        <MiniGrid gridID={id+'_Grid'}/>
                                        <input
                                            disabled={disabled}
                                            className='solution-inputs'
                                            id={id}
                                            onChange={(e) => handleOnChange(e)}
                                        >
                                        </input>
                                    </li>)
                                : <li className={`given main-list ${pauseClass}`} key={idx2}><span id={id} >{box}</span></li>
                            )
                        })
                    )
                })
            }
        </ul>
    )
}

export default Grid;
