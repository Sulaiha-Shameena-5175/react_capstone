import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import  Login  from './components/login';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard';
function App() {

  const [profileData, setProfileData] = useState(null)

  async function getData(){
    let response = await fetch('/profile', {
      Method: 'POST',
      Headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
    })
    if(response){

      const res = await response.json()
      setProfileData(({
        name: res.name
      }))

    }
    console.log(setProfileData)
  }



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login/>} >
          </Route>
          <Route exact path='/dashboard'  element={<Dashboard/>} >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
