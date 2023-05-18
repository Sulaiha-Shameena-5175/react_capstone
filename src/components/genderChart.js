import React, {Component, useEffect, useState} from "react";
import {Button, TextField, Input, Container, Grid, Divider} from '@material-ui/core'
import EChartsReact from "echarts-for-react";

function GenderChart(){

    const [totalGenderCount, setTotalGenderCount] = useState(null);
    const [totalGenderCountMale, setTotalGenderCountMale] = useState(null);
    const [totalGenderCountFemale, setTotalGenderCountFemale] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        console.log('token', token)
        const opts = {
            method: 'GET',
            headers: {
                Authentication: "Bearer " + token,
                "Content-Type": "application/json",
              },
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
    }, [])

    const option = {


            series: [
                {
                    data: [
                        {
                            name: "male",
                            value: totalGenderCountMale
                        },
                        {
                            name: "female",
                            value: totalGenderCountFemale
                        }
                    ],
                    type: 'pie'
                }
            ]
        }
        return(
            <div>
                <p>Gender Distribution</p>
                <EChartsReact option={option}/>
            </div>
        )

}

export default GenderChart;