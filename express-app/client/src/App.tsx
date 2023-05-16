import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';


const DataComp = () => {
  return <>
    <div>
      <label>
        {"Hello"}
      </label>
    </div>
  </>
}

function App() {
  let [labelText, setLabelText] = useState('label');
  useEffect(() => {
    fetch('http://localhost:5000/users/')
    .then((result: any) => {
      console.log(result);
    })
    .catch((error: any) => {
      console.log(error);
    })
  }, []);
  return (
    <>
      <div className="App">
        <DataComp/>
      </div>
    </>
  );
}

export default App;
