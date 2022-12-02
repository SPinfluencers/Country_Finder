import React from "react";
import "../components/country.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState([]);
  const handleClose = () => setOpen(false);
  const [sortByPopulation, setSortByPopulation] = useState("");
 
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((r) => setData(r.data))
      .catch((e) => console.log(e));
  }, []);

  //sort
  const handleChange=(event)=>{
    // console.log(event)
    setSortByPopulation(event.target.value)
    //  console.log(sortByPopulation)
     let sortedData = []

     if(sortByPopulation =='desc'){
         sortedData = data.sort((a,b) => a.population-b.population)
     }
     else {
         sortedData = data.sort((a,b) => b.population-a.population)
     }
     setData(sortedData);
 }

 //filter
const handleFilter=(event)=>{
    //console.log(event)
    console.log(event.target.value)
    axios.get(`https://restcountries.com/v3.1/region/${event.target.value}`).then((res)=>{
        console.log(res.data)
        setData(res.data)
    })
  }
console.log(data)
  return (
    <div>
      <h1 className="nav">Masai Country Finder</h1>
      <div style = {{display:"flex",gap:"20px", justifyContent:'center'}}>
        <div  style = {{ display: "flex", gap: "20px", }}>
          <h3>FILTER BY REGION</h3>
          <select onChange = { handleFilter } >
            <option value="" selected="true">Select Country</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Polar">Polar</option>
            <option value="AntarCtic">AntarCtic</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <h4>SORT BY POPULATION</h4>
          <select value ={sortByPopulation} onChange = {handleChange} >
            <option value="" selected="true">Sort By Population</option>
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
        </div>
      </div>

      <div className="country" >
        {data.map((item) => (
          <Paper className="box" elevation={8} key={item.name.common} >

            <img src={item.flags.png} alt="" width="100%" />

            <h3> {item.name.common}</h3>

            <h5>Population: {item.population}</h5>

            <h5>Region: {item.region}</h5>

            <h5>Capital: {item.capital}</h5>

            <Button size="small" onClick={handleOpen} variant="contained">
              More details
            </Button>

            <Modal open={open} onClose={handleClose} >
              <Box className="style">
                <Typography variant="h3" >
                  <h6>Native-name: {item.name.common}</h6>
                  <h6>Sub-Region: {item.subregion}</h6>
                  <h6 style={{ color: "black" }}>
                    Borders:{item.borders ? item.borders.join(" ") : ""}
                  </h6>
                </Typography>
              </Box>
            </Modal>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default App;



