// 5. Code the <Score> component so that it renders the score object's date & score properties.
import {useState} from 'react';

function Score({date, score}){
    return (
        <li>
            <strong>Date:</strong> {date} &nbsp; | &nbsp;
            <strong>Score:</strong> {score}
        </li>
    );
}

export default Score;