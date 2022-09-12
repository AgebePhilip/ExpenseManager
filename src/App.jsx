import { useState } from "react";
import Navbar from "./components/Navbar";
import CreateProfile from './components/CreateProfile/CreateProfile'

import EmployeeExpense from './components/EmployeeExpense/EmployeeExpense'



function App() {
  const [image, setImage] = useState("https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg")
  
  function changeImage (e) {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
        const reader = new FileReader();

        reader.addEventListener('load', function(){
            setImage(reader.result);
        })

        reader.readAsDataURL(chosenFile);
    }
  }
  
  
  const [inputValues, setInputValues] = useState({
    name: "",
    jobDescription: "",
    location: "",
    department: ""
  })

  const [readyToRoute, setReadyToRoute] = useState(false)

  function inputChange (e) {
    const {name, value} = e.target;

        setInputValues(prevItem => ({...prevItem, [name] : value}))
  }

  function submit (e) {
    e.preventdefault; 

    if (inputValues.name && inputValues.jobDescription && inputValues.location && inputValues.department) {
      setReadyToRoute(true)
    }
  }

  return (
    <div className="app">
      <Navbar />
      { 
        readyToRoute ? 
        <EmployeeExpense image={image} name={inputValues.name} job={inputValues.jobDescription} location={inputValues.location} department={inputValues.department}/> :
        <CreateProfile onChange = {inputChange} inputValues={inputValues} submit={submit} image={image} changeImage={changeImage}/> 
      }
    </div>
  )
}

export default App
