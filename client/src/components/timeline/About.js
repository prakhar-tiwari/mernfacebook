import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Icon from '@material-ui/core/Icon';

const useStyles = theme => ({
    about: {
        marginTop: theme.spacing(2),
        background: '#fff',
        border: '1px solid #ccd0d5',
        borderRadius: '3px',
        marginBottom: '10px'
    },
    aboutHeader: {
        background: '#f5f6f7',
        borderBottom: '1px solid #d3d6db',
        borderRadius: '2px 2px 0 0',
        marginBottom: '15px',
        paddingTop:'16px'
    },
    headerContent: {
        fontSize: '20px',
        fontWeight: 'bold',
        height: '32px',
        margin:'0 12px 5px',
        lineHeight:1,
        '& a': {
            color: '#4b4f56',
            textDecoration:'none',
            verticalAlign:'text-top'
        }
    },
    personIcon:{
        color:'#969292',
    }
})

class About extends Component {
    render() {
        const { classes } = this.props;
        const { user } = this.props.auth;
        return (
            <div className={classes.about}>
                <div className={classes.aboutHeader}>
                    <h3 className={classes.headerContent}>
                        <Icon>
                            <PersonIcon className={classes.personIcon} />
                        </Icon>
                        <Link to={`/${user.userName}/about`}>About</Link>
                    </h3>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps)(withStyles(useStyles)(withRouter(About)));
