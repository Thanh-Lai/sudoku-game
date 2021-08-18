import React from 'react';

function Controls({selectDifficulty}) {
    return (
        <div>
            <div>
                <strong>Difficulty:&nbsp;&nbsp;</strong>
                <select id="difficulty-lvl" onChange={selectDifficulty}>
                    <option id="easy" value="easy">Easy</option>
                    <option id="medium"  value="medium">Mediun</option>
                    <option id="hard"  value="hard">Hard</option>
                </select>
            </div>
        </div>
    )
}

export default Controls;
