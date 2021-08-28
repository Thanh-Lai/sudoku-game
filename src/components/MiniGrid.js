import React from 'react'

function MiniGrid({gridID}) {
    const nums = [1,2,3,4,5,6,7,8,9];
    return (
        <ul id={gridID} className="notes-grid">
            {
                nums.map((num) => {
                    return (
                        <li key={num} id={gridID+num} className="notes-list hide-num">{num}</li>
                    )
                })
            }
        </ul>
    )
}

export default MiniGrid;
