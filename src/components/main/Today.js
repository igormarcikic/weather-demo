import React, { useState } from 'react';
import CitySearch from './CitySearch';
import DisplayToday from './DisplayToday';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        },
    }));

const Today = () => {
    const classes = useStyles();
    const [city, setCity] = useState({value: null})

    const userCity = (city) => {
        setCity({value:city})
    }

    return (
        <Container
        	className={classes.root}
        >
            <CitySearch findCity={userCity}/>
            {city ? <DisplayToday city={city} /> : null}
        </Container>
    )
}

export default Today;