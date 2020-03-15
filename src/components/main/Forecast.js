import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '15vh',
    },
    boxes: {
        width: '25%',
        backgroundColor: 'gray',
        border: '1px solid red'
    }
}));

const Forecast = () => {
    const classes = useStyles();
    return (
        <Box
        	className={classes.root}
        	display="flex"
        >
            <Box 
            	className={classes.boxes}
            	display="flex"
            	flexDirection="column"
            >
            	Box
            </Box>
            <Box 
            	className={classes.boxes}
            	display="flex"
            	flexDirection="column"
            >
            	Box
            </Box>
            <Box 
            	className={classes.boxes}
            	display="flex"
            	flexDirection="column"
            >
            	Box
            </Box>
            <Box 
            	className={classes.boxes}
            	display="flex"
            	flexDirection="column"
            >
            	Box
            </Box>
        </Box>
    )
}

export default Forecast;