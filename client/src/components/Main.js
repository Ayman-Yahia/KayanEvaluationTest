import React,{useState} from 'react'
import axios from 'axios'
import xml2js from 'xml2js'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import XMLParser from 'react-xml-parser';
import {
    InputLabel,
    Input,
    Button,
  } from "@material-ui/core";
import Show from './Show';
const Main = () => {
    const[drug,setDrug]=useState("")
    const[disease,setDisease]=useState("")
    const[type,setType]=useState(1)
    const[resultf,setResultf]=useState(null)
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
              // converting xml response to json file for using in show component
              setResultf(new XMLParser().parseFromString(response.data))
            })
          .catch((err) => {
              // alert("The Durg you trying to find doesn't exist or there is an input error!")
              console.log(err);
          })
        
        setDrug("")
        setDisease("")
        setType(1)
    }
    
    return (
        <>
      <div
        style={{
          justifyContent: "center",
		  backgroundColor: "#b0c5e0",
          minHeight:630+"px",
          
        }}
      >
        <div>
          <form onSubmit={searchDrug} style={{ width: "50%" ,marginLeft:"25%",padding:20+"px"}}>
            <img alt ={"Kayan"}src={"https://www.kayan-healthcare.com/static/media/Kayan-Healthcare-Logo.422de27a.svg"} style={{width:"15%",height:"7.5%"}} />
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
        {
          
        resultf?
          // console.log(resultf)
          <div className="container d-flex justify-content-center align-items-center h-100">
              <Show result={resultf}/>
          </div>:""
        }
      </div>

      
        
        
         
        </>
    )
}

export default Main
