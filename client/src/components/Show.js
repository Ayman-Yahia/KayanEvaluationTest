import React from 'react'

const Show = (props) => {
    const{resultf}=props
    return (
        <div className="row">
                <h1>{resultf.Response["drug"][0]}</h1>
                <p>{resultf.Response["description"][0]}</p>   
                    
            </div>
    )
}

export default Show
