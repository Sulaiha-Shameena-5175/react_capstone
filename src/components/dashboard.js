import React, { useEffect, useState } from "react";
import {Button, TextField, Input, Container, Divider} from '@material-ui/core'
import EChartsReact from "echarts-for-react";
import GenderChart from "./genderChart";
import EthnicGroupChart from "./ethnicGroupChart";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import Summary from "./summary";
import Grid from "@material-ui/core/Grid";
import Filter from "./filter";

function Dashboard(){


        const navigate = useNavigate();
        const option = {
            xAxis : {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed']
            },
            yAxis:{
                type: 'value'
            },
            series: [
                {
                    data: [120, 100, 200],
                    type: 'bar'
                }
            ]
        }
        useEffect(() => {
            const username = sessionStorage.getItem("username")
            const token = sessionStorage.getItem("token")
            if(!username || !token){
                navigate('/')
            }
        },[])
        return(
            <div>
                <NavBar/>
                <Summary/>
                <Grid container spacing={3} style={{ alignItems:'center', display: 'flex', justifyContent: 'center'}} >
                    <Grid xs={8}>
                        <EthnicGroupChart/>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ alignItems:'center', display: 'flex', justifyContent: 'center'}} >
                    <Grid xs={8}>
                        <GenderChart/>
                    </Grid>

                    <Grid xs={8}>
                        <Filter/>
                    </Grid>
                </Grid>
            </div>
        )

}

export default Dashboard;