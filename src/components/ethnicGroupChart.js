import React, {Component, useEffect, useState} from "react";
import {Button, TextField, Input, Container, Grid, Divider} from '@material-ui/core'
import EChartsReact from "echarts-for-react";

function EthnicGroupChart(){

    const [groupA, setGroupA] = useState(null);
    const [groupB, setGroupB] = useState(null);
    const [groupC, setGroupC] = useState(null);
    const [groupD, setGroupD] = useState(null);
    const [groupE, setGroupE] = useState(null);

    useEffect(() => {
        getDatabyGroup("group A")
        getDatabyGroup("group B")
        getDatabyGroup("group C")
        getDatabyGroup("group D")
        getDatabyGroup("group E")
        console.log(option)
    }, [])



    const getDatabyGroup = (groupType) => {
        const token = sessionStorage.getItem("token")
        console.log('token', token)
        const opts = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authentication: "Bearer " + token,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                "ethnicGroup": groupType
            })
        }
        const res = fetch('http://localhost:5000/dataByEthnicGroup', opts)
        .then(resp => resp.json())
        .then((data)=> {
            console.log(groupType,data[0][0])
            if(groupType == 'group A'){
                setGroupA(data[0][0])
            }
            if(groupType == 'group B'){
                setGroupB(data[0][0])
            }
            if(groupType == 'group C'){
                setGroupC(data[0][0])
            }
            if(groupType == 'group D'){
                setGroupD(data[0][0])
            }
            if(groupType == 'group E'){
                setGroupE(data[0][0])
            }
        })
        .catch(error => {
            console.log("error", error)
        })

    }

    const option = {

            xAxis:{
                type: 'category',
                data: ['Group A','Group B','Group C','Group D','Group E']
            },
            yAxis:{
                type: 'value'
            },
            series: [
                {
                    data: [groupA, groupB, groupC, groupD, groupE],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        }
        return(
            <div>
                <p>Distribution of Ethnic Group</p>
                <EChartsReact option={option}/>
            </div>
        )

}

export default EthnicGroupChart;