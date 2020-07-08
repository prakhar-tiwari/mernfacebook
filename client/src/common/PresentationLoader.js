import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: '#fff',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(5),
        width: '80%',
        justifyContent: 'space-around'
    },

    wrapperCell: {
        display: 'flex',
        padding: '10px'
    },

    // Animation
    '@keyframes placeHolderShimmer': {
        from: {
            backgroundPosition: '-300px 0'
        },
        to: {
            backgroundPosition: '300px 0'
        }
    },

    animatedBackground: {
        animationDuration: '1.25s',
        animationFillMode: 'forwards',
        animationIterationCount: 'infinite',
        animationName: '$placeHolderShimmer',
        animationTimingFunction: 'linear',
        background: '#F6F6F6',
        background: 'linear-gradient(to right, #c7d1c9 8%, #e6ebe7 18%, #dfe6e0 33%)',
        backgroundSize: '800px 104px',
        height: '96px',
        position: 'relative',
    },

    // Page Elements
    image: {
        height: '50px',
        width: '50px',
        borderRadius: '50%',
        margin: '10px 10px',
        animationDuration: '1.25s',
        animationFillMode: 'forwards',
        animationIterationCount: 'infinite',
        animationName: '$placeHolderShimmer',
        animationTimingFunction: 'linear',
        background: '#F6F6F6',
        background: 'linear-gradient(to right, #c7d1c9 8%, #e6ebe7 18%, #dfe6e0 33%)',
        backgroundSize: '800px 104px',
        position: 'relative',
    },

    text: {
        width: '100%'
    },

    textLine: {
        height: '18px',
        width: '90%',
        //  background: #F6F6F6,
        margin: '10px 10px',
        animationDuration: '1.25s',
        animationFillMode: 'forwards',
        animationIterationCount: 'infinite',
        animationName: '$placeHolderShimmer',
        animationTimingFunction: 'linear',
        background: '#F6F6F6',
        background: 'linear-gradient(to right, #c7d1c9 8%, #e6ebe7 18%, #dfe6e0 33%)',
        backgroundSize: '800px 104px',
        position: 'relative',
    }


}))

const PresentationLoader = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapperCell}>
                <div className={classes.image}></div>
                <div className={classes.text}>
                    <div className={classes.textLine}></div>
                    <div className={classes.textLine}></div>
                    <div className={classes.textLine}></div>
                </div>
            </div>
            <div className={classes.text}>
                <div className={classes.textLine}></div>
                <div className={classes.textLine}></div>
            </div>
        </div>
    )
}

export default PresentationLoader;
