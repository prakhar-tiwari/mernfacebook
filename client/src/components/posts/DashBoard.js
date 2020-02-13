import React from 'react';
import CreatePost from './CreatePost';
import Feed from './Feed';
import { makeStyles } from '@material-ui/core';
import ErrorBoundary from '../../common/ErrorBoundary';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '20px',
        minHeight: '100vh'
    }
}));

function DashBoard() {
    const classes = useStyles();

    return (
        <ErrorBoundary>
            <div className={classes.root} >
                <CreatePost />
                <Feed />
            </div>
        </ErrorBoundary>
    )
}

export default DashBoard;
