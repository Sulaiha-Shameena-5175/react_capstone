import React, {Component} from "react";
import {Button, TextField, Input, Container, Grid} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
function Login() {

        const navigate = useNavigate();
        const handleClick = () => {
            const opts = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    "email": "gaz",
                    "password": "1234"
                })
            }
            fetch('http://localhost:5000/login', opts)
            .then(resp => {
                console.log("hello",resp)
                navigate('/dashboard')
                //if(resp.status === 200) return resp.json();
                //else alert("error")
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
                        <Input type="name" name="username" placeholder="Username" style={{'marginBottom': '10px'}} /> <br></br>
                        <Input type="password" name="password" placeholder="Password" style={{'marginBottom': '10px'}} /> <br></br>
                        <Button variant="contained" color="primary" size="small" onClick={handleClick} value="Login">Login</Button>
                    </form>
                </div>
            </Grid>
        )
}

export default Login;