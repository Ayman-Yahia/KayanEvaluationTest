import React from 'react'

const Show = (props) => {
    const{resultf}=props
    return (
        <div className="row">
                <h1>Drug:{resultf.Response["drug"][0]}</h1>
                <p>Description:{resultf.Response["description"][0]}</p>   
                    
            </div>
    )
}

export default Show
