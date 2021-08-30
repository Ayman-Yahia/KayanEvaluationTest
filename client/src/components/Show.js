import React from 'react'

const Show = (props) => {
    const{result}=props

    console.log(result.children[1].name);
    return (
        <div className="row">
                <h1>Drug:{result.children[1].name}</h1>
                <p>Description:{result.children[2].name}</p>   
                    
            </div>
    )
}

export default Show
