import React,{useEffect,useState} from 'react'
import axios from 'axios'
import qs from 'qs'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    InputLabel,
    Input,
    Button,
  } from "@material-ui/core";
const Main = () => {
    const[drug1,setDrug1]=useState("")
    const[disease1,setDisease1]=useState("")
    const[type1,setType1]=useState(1)
    const[result,setResult]=useState()
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    const requestBody = {
        drug: drug1,
        disease: disease1,
        type: type1
      }
    const searchDrug=()=>{
        axios.get('https://localhost:8000/kayan',qs.stringify(requestBody),config)
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
            <Input id="novelName" value={drug1} onChange={ e => setDrug1(e.target.value) } type="text" required/>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="desc">Disease Name</InputLabel>
            <Input id="desc" value={disease1} onChange={ e => setDisease1(e.target.value) } type="desc" required/>
          </FormControl>
        <FormControl >
        <InputLabel htmlFor="age-native-simple">Type:</InputLabel>
        <Select
          native
          value={type1}
          onChange={ e => setType1(e.target.value) }
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
