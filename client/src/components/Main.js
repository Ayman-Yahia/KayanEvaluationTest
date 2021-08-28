import React,{useState} from 'react'
import axios from 'axios'
import xml2js from 'xml2js'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    InputLabel,
    Input,
    Button,
  } from "@material-ui/core";
const Main = () => {
    const[drug,setDrug]=useState("")
    const[disease,setDisease]=useState("")
    const[type,setType]=useState(1)
    const[resultf,setResultf]=useState()
    const [loaded,setLoaded]=useState(false)
    
    const searchDrug=(e)=>{
        const xmlData = `
        <Request>
            <drug>${drug}</drug>
            <disease>${disease}</disease>
            <type>${type}</type>
        </Request>
        `;
        var config = {
            headers: {'Content-Type': 'text/xml'}
        };
        e.preventDefault()
        
        axios.post('http://localhost:8000/kayan',xmlData,config)
        .then((response ) => {
            xml2js.parseString(response.data,(err, result) => {
                if(err) {
                    throw err;
                }
                // `result` is a JavaScript object
                // convert it to a JSON string
                setResultf(JSON.stringify(result, null, 4))
                setLoaded(true)
                console.log("done");
          })})
        .catch((err) => {
            alert("The Durg you trying to find doesn't exist or there is an input error!")
        })
        
        setDrug("")
        setDisease("")
        setType(1)
    }
    
    return (
        <>
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 20,
		  backgroundColor: "#4c4c4c",
          minHeight:600+"px"
        }}
      >
          <div>
        <form onSubmit={searchDrug} style={{ width: "50%" }}>
          <h1>Search Page</h1>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="novelName">Drug Name</InputLabel>
            <Input id="novelName" value={drug} onChange={ e => setDrug(e.target.value) } type="text" required/>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="desc">Disease Name</InputLabel>
            <Input id="desc" value={disease} onChange={ e => setDisease(e.target.value) } type="desc" required/>
          </FormControl>
        <FormControl >
        <InputLabel htmlFor="age-native-simple">Type:</InputLabel>
        <Select
          native
          value={type}
          onChange={ e => setType(e.target.value) }
        >
          <option aria-label="None" value={1} >1</option>
          <option aria-label="None" value={2} >2</option>

        </Select>
        </FormControl>
        <div ><br></br>
          <Button type="submit" className="orange" variant="contained" size="medium">
              Search 
          </Button>
        </div>
          
        </form>
        </div>
        {resultf?
            // console.log(resultf)
        
        <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="row">
                <h1>{resultf.Response["drug"][0]}</h1>
                <p>{resultf.Response["description"][0]}</p>   
                    
            </div>
        </div>:""
        }
      </div>

            
        </>
    )
}

export default Main
