import React from 'react'

const styles={
    red:{
        color:"red"
    }
}

export default function ScoreShower({score}) {
    return (
        <div>
<p style={styles.red}> Your Score is {score}</p>
            
        </div>
    )
}
