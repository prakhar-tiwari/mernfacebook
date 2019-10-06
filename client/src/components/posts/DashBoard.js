import React from 'react';
import CreatePost from './CreatePost';
import Feed from './Feed';
import {makeStyles} from '@material-ui/core';

const useStyles=makeStyles(theme=>({
    root:{
        marginTop:'20px',
        minHeight:'520px'
    }
}));

function DashBoard() {
    const classes=useStyles();

    return (
        <div className={classes.root} >
            <CreatePost/>
            <Feed/>
        </div>
    )
}

export default DashBoard;
