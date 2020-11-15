import React from "react";

export default function Difficulty({level}) {
    const difficultyArray = calculateStars(level);
  return (
    <React.Fragment>
        {
            difficultyArray.map((item, i) => (
                <span key={`${item}=${i}`} className={`fa fa-star ${item?'':'unchecked'}`}></span>
            ))
        }
    </React.Fragment>
  );
}

function calculateStars(level){
    if(level === 'hard'){
        return [true, true, true, false, false];
    }
    else if(level === 'medium'){
        return [true, true, false, false, false];
    }
    else{
        return [true, false, false, false, false];
    }
}