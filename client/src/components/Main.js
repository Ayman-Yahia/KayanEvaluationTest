import React,{useEffect,useState} from 'react'
import axios from 'axios'
import QueryString from 'qs'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    InputLabel,
    Input,
    Button,
  } from "@material-ui/core";
const Main = () => {
    const[kayan,setKayan]=useState([])
    const[loaded,setLoaded]=useState(false)
    const[drug,setDrug]=useState("")
    const[disease,setDisease]=useState("")
    const[type,setType]=useState(1)
    const[result,setResult]=useState()
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    const requestBody = {
        drug: drug,
        disease: disease,
        type: type
      }
    const searchDrug=()=>{
        axios.get('https://localhost:8000/kayan', QueryString.stringify(requestBody), config)
        .then((result) => {
            setResult(result.data)
            console.log("done");
          })
          .catch((err) => {
            alert("The Durg you trying to find doesn't exist!")
          })
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
            
        </>
    )
}

export default Main