import React from 'react'

const Show = (props) => {
    const{result}=props
    // console.log(result);
    // console.log(result.children[1].value);
    return (
        <>
        {result.children.length>0?
        <div className="row">
                <h1>Drug:{result.children[1].value}</h1>
                <p>Description:{result.children[2].value}</p>   
                    
            </div>:<p style={{color:'red'}}>The Durg you trying to find doesn't exist or there is an input error!</p>
    }
    </>)
}

export default Show
