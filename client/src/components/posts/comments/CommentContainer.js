import React from 'react';
import { makeStyles } from '@material-ui/core';
import Comments from './Comments';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    expansion: {
        padding: 0
    }
}));

function CommentContainer(props) {
    const { comments } = props;
    const classes = useStyles();
    const commentsInPanel = comments.map((comment, i) => {
        if (i === 0) {
            return <ExpansionPanelSummary
                className={classes.expansion}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header">
                <Comments key={comment._id} comment={comment} />
            </ExpansionPanelSummary>
        }
        else {
            return <ExpansionPanelDetails className={classes.expansion}>
                <Comments key={comment._id} comment={comment} />
            </ExpansionPanelDetails>
        }
    });
    return (
        <ExpansionPanel>
            {commentsInPanel}
        </ExpansionPanel>
    )
}

export default CommentContainer;
