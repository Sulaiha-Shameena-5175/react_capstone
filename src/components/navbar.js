import React, { useEffect, useState } from "react";
import {Button, TextField, Input, Container, Grid, Box, Menu, MenuItem} from '@material-ui/core'
import { Navigate, useNavigate } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { color } from "echarts";

const style = {
    userIcon: {
        backgroundColor: '#b9f6ca',
        padding: '5px',
        borderRadius: '100%',
        color: 'black'
    }
}

function NavBar() {

        const [anchorE1User, setAnchorE1User] = React.useState(null);
        const [username, setUsername] = useState('');

        const navigate = useNavigate();

        const getUserName = () => {
            setUsername(sessionStorage.getItem("username"))
        }

        const handleOpenUserMenu = (event) => {
            setAnchorE1User(event.currentTarget);
        }
        const handleCloseUserMenu = () => {
            setAnchorE1User(null);
        }
        const handleLogout = () => {
            console.log('logout');
            handleCloseUserMenu();
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("token")
            navigate('/')
        }

        useEffect(() => {
            getUserName();
        }, [])

        return(
           <div>
            <AppBar position="fixed">
                <Toolbar variant="dense" style={{ display: 'flex', justifyContent:'space-between'}}>
                    <Typography>
                        Tiger Analytics
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="open settings">
                            <div style={style.userIcon} onClick={handleOpenUserMenu}>
                                {username.charAt(0).toLocaleUpperCase()}
                            </div>
                        </Tooltip>
                        <Menu anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorE1User)}
                            anchorEl={anchorE1User}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLogout} >
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
           </div>
        )
}

export default NavBar;