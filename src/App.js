import React, { useEffect } from 'react';
import { useState } from 'react';
import Axios from "axios";
import "./App.css"



function App() {
  // InJavaScript:
  // 
  //   fetch ("https://catfact.ninja/fact")
  // .then((res)=> res.json())
  // .then((data)=>{
  // console.log(data);
  // });


  const [generateExecuse, setGenerateExecuse] = useState("");

  const fetchExcuse = (excuse => {
    Axios.get(`https://excuser.herokuapp.com/v1/excuse/${excuse}/`)
      .then((res) => {
        setGenerateExecuse(res.data[0].excuse)
      });
  });
  const [catFact, setCatFact] = useState();

  const fetchCatFact = () => {
    Axios.get("https://catfact.ninja/fact")
      .then((res) => {
        setCatFact(res.data.fact);
      });

  }
  const [predictAge, setPredictAge] = useState(null);
  const [name, setName] = useState("");
  const fetchData = () => {
    Axios.get(`https://api.agify.io/?name=${name}`)
      .then((res) => {
        setPredictAge(res.data)
      });
  };
  useEffect(() => {
    fetchCatFact();
  }, []);




  return (
    <div>
      <input placeholder='Ex. Jayen...'
        onChange={(event) => {
          setName(event.target.value)
        }} />
      <button onClick={fetchData}> Predict Age </button>
      <h1>
        Name:{predictAge?.name}
      </h1>
      <h1>
        Count:{predictAge?.count}
      </h1>
      <h1>
        Predict age:{predictAge?.age}
      </h1>




      <button onClick={fetchCatFact}> Generate Cat Fact</button>
      <p> {catFact}</p>
      <div>
        <h1>Generate An Execuse</h1>
        <button onClick={() => fetchExcuse("party")}>Party</button>
        <button onClick={() => fetchExcuse("office")}>Office</button>
        <button onClick={() => fetchExcuse("family")}>Family</button>
        <p>{generateExecuse}</p>
      </div>

    </div>

  );
}

export default App; 