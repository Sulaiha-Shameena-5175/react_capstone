import React, { useEffect, useState } from "react";
import {Button, TextField, Input, Container, Divider} from '@material-ui/core'
import EChartsReact from "echarts-for-react";
import GenderChart from "./genderChart";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import { styled } from '@material-ui/core/styles'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = {
    grid: { },
    paper: {
        backgroundColor: '#b9f6ca',
        padding: '4px' ,
        textAlign: 'center' ,
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center'
    }
}

function Summary(){

    const [userName, setUserName] = useState('');
    const [totalGenderCount, setTotalGenderCount] = useState(null);
    const [totalGenderCountMale, setTotalGenderCountMale] = useState(null);
    const [totalGenderCountFemale, setTotalGenderCountFemale] = useState(null);

    useEffect(() => {
        const opts = {
            method: 'GET',
        }
        console.log('mounted')
        fetch('http://localhost:5000/totalGenderCount', opts)
        .then(res => res.json())
        .then(data =>
            {
                console.log("total", data)
                setTotalGenderCount(data[0]);
            })

        fetch('http://localhost:5000/genderDataMale', opts)
        .then(res => res.json())
        .then(data =>
            {
                console.log("total", data)
                setTotalGenderCountMale(data[0]);
            })
        fetch('http://localhost:5000/genderDataFemale', opts)
        .then(res => res.json())
        .then(data =>
            {
                console.log("total", data)
                setTotalGenderCountFemale(data[0]);
            })
        setUserName(sessionStorage.getItem("username"))
    }, [])

        return(
            <div style={{ marginTop: '100px' }}>

            <p style={{ marginLeft: '100px' }}>Hi {userName}, </p>

               <Grid container spacing={3} style={{ alignItems:'center', display: 'flex', justifyContent: 'center'}} >
                    <Grid item xs={3}>
                        <Paper style={styles.paper} >Total Number of Students: {totalGenderCount} </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles.paper} >Total Number of Boys: {totalGenderCountMale}</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles.paper} >Total Number of Girls: {totalGenderCountFemale}</Paper>
                    </Grid>
               </Grid>
            </div>
        )

}

export default Summary;