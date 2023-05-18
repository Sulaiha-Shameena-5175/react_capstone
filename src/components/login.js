import React, {Component, useEffect, useState} from "react";
import {Button, TextField, Input, Container, Grid} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
function Login() {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const navigate = useNavigate();
        const handleClick = () => {
            const opts = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }
            fetch('http://localhost:5000/login', opts)
            .then(resp => resp.json())
            .then((data)=> {
                console.log(data.token, email)
                sessionStorage.setItem("token", data.token)
                sessionStorage.setItem("username", email)

                navigate('/dashboard')
            })
            .catch(error => {
                console.log("error", error)
            })
        }



        return(
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <div style={{ 'textAlign': "center" }}>
                    <h5>Login</h5>
                    <form>
                        <Input type="name" name="username" placeholder="Username" style={{'marginBottom': '10px'}} value={email} onChange={(e)=> setEmail(e.target.value) } /> <br></br>
                        <Input type="password" name="password" placeholder="Password" style={{'marginBottom': '10px'}} value={password} onChange={(e)=> setPassword(e.target.value) }  /> <br></br>
                        <Button variant="contained" color="primary" size="small" onClick={handleClick} value="Login">Login</Button>
                    </form>
                </div>
            </Grid>
        )
}

export default Login;