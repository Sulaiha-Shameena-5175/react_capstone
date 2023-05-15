import React, {Component} from "react";
import {Button, TextField, Input, Container, Grid} from '@material-ui/core'
export class Login extends Component{
    render(){
        return(
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <div style={{ 'textAlign': "center" }}>
                    <h5>Login</h5>
                    <form action="/login" method="POST">
                        <Input type="name" name="username" placeholder="Username" style={{'marginBottom': '10px'}} /> <br></br>
                        <Input type="password" name="password" placeholder="Password" style={{'marginBottom': '10px'}} /> <br></br>
                        <Button variant="contained" color="primary" size="small" type="submit" value="Login">Login</Button>
                    </form>
                </div>
            </Grid>
        )
    }
}