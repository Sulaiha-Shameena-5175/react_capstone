import React, { useEffect, useState } from "react";
import {Button, TextField, Input, Container, Divider, MenuItem} from '@material-ui/core'
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';


function Filter(){

    const [range, setRange] = useState(null);
    const [mark, setMark] = useState(null);
    const [result, setResult] = useState(null);
    const handleChange = (e) => {
        setRange(e.target.value);
    }



    const getDatabyGroup = () => {
        console.log('getDatabyGroup', range, mark)
        const token = sessionStorage.getItem("token")
        console.log('filter token', token)
        const opts = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authentication: "Bearer " + token,
                "Content-Type": "application/json",
              },

            body: JSON.stringify({
                "req_range": range,
                "req_mark": mark
            })

        }
        fetch('http://localhost:5000/scoreByRange', opts)
        .then(resp => resp.json())
        .then((data)=> {
            console.log(data)
            setResult(data.slice(1,20))
            console.log("qwertyu",result)
        })
        .catch(error => {
            console.log("error", error)
        })

    }

    return(
        <div style={{
            marginBottom: 100
         }}>
            <p>Get math mark by range</p>
            <Grid  container sx ={{ minWidth : 120}}>

                <Grid xs={6}>
                    <FormControl>
                        <InputLabel id="range-label">
                            Range
                        </InputLabel>
                        <Select
                            labelId="range-label"
                            value={range}
                            onChange={handleChange}
                            >
                            <MenuItem value={1}>
                                above and equal
                            </MenuItem>
                            <MenuItem value={2}>
                                below and equal
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <FormControl>
                        <InputLabel id="mark-label">
                            Mark
                        </InputLabel>
                        <Input labelId="mark-label" type="number" value={mark} onChange={(e) => setMark(e.target.value)} />
                    </FormControl>
                </Grid>

                <br></br>


                <Button  variant="contained" color="primary" size="small" onClick={getDatabyGroup} style={{ marginTop: '10px'}} >Search</Button>
            </Grid>
            {result &&
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Gender</TableCell>
            <TableCell align="right">EthnicGroup</TableCell>
            <TableCell align="right">ParentMaritalStatus</TableCell>
            <TableCell align="right">MathScore</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
              <TableCell align="right">{row[3]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            </TableContainer>
            }
        </div>
    )

}

export default Filter;