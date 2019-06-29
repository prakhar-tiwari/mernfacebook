import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%'
    },
    media: {
        width: '100%',
        marginTop:theme.spacing(2),
        paddingTop: '56.25%', // 16:9
    },
})
)

export default function SinglePost() {
    const classes = useStyles();
    return (
        <div>
            <Typography component="p" style={{textAlign:'left'}}>
                I am the fastest man alive
            </Typography>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="images/flash.jpg"
                    title="Paella dish"
                />
            </Card>
        </div>
    )
}
