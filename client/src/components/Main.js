import React,{useEffect,useState} from 'react'
import axios from 'axios'
const Main = () => {
    const[kayan,setKayan]=useState([])
    const[loaded,setLoaded]=useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/kayan',{
            "Content-Type": "application/xml; charset=utf-8"
         })
            .then(res => {
                setKayan(res.data);
                console.log(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err.response);
            })

    }, [])
    return (
        <div>
            
        </div>
    )
}

export default Main
