import React, { useContext } from 'react';
import { Context } from './../../Context/Context';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
    	height: '100vh',
    	display: 'flex',
    	flexDirection: 'column',
    	justifyContent: 'center'
    }
    }));

const UserProfile = () => {
    const classes = useStyles();
    const { user } = useContext(Context);

    const isVerified = () => {
        return user.value.user.emailVerified ? "Verified" : "Not verified";
    }
    return(
        <Container 
            className={classes.root}    
        >
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell><strong>User email:</strong></TableCell>
                    <TableCell><strong>Verified: </strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>{user.value.user.email}</TableCell>
                    <TableCell>{isVerified()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </Container>
    )
}

export default UserProfile;