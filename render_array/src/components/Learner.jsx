 import {useState} from 'react';
 import Score from './Score';
 
 function Learner ({name, bio, scores}){
    return (
        <div className="learner" >
            <h2>{name}</h2>
            <p>{bio}</p>
            <h3>Scores</h3>
            <ul className='learner-list'>
                {scores.map( (score, index) => (
                    <Score
                        key = {index}
                        date = {score.date}
                        score = {score.score}
                    />
                ))}
            </ul>
        </div>
    );
 }


 export default Learner;