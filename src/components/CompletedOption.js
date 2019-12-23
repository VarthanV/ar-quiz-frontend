import React from 'react'

export default function CompletedOption({options,correctOption}) {
    return (
        <div>
            {
                options.map(item => 
                
                <div key={item}>
                {item === correctOption  ?<button style={{backgroundColor:"green",color:"white"}} disabled>{item} </button>:<button  disabled>{item} </button> }   

                </div>)
            }
            
        </div>
    )
}
