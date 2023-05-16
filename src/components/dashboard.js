import React, {Component} from "react";
import {Button, TextField, Input, Container, Grid} from '@material-ui/core'
export class Dashboard extends Component{
    render(){
        return(
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <div style={{ 'textAlign': "center" }}>
                    <h5>Dashboard</h5>

                </div>
            </Grid>
        )
    }
}