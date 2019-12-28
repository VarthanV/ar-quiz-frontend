import React from 'react'

const styles={
    red:{
        color:"red"
    }
}

export default function ScoreShower({score}) {
    return (
        <div className="card p-3">
            <h1 style={{color: "white"}} className="display-1 mb-0">{score}</h1>
            <p style={{color: "white"}}>Your marks now</p>
        </div>
    )
}
