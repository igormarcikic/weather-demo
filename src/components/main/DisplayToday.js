import React, { useEffect, useState } from 'react';
import * as APIs from './../../API';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
            
    },
    title: {
        fontSize: 200,
        color: 'white',
        textAlign: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 500,
    },
    city: {
        color: 'white'
    }
    }));

const DisplayToday = ({city}) => {
    const classes = useStyles();
    console.log(city.value)
    const [weather, setWeather] = useState({value: null})
    console.log(weather)

    useEffect(()=> {
        console.log('usee effect fired')
        const getWeather = async() => {
            let cityID = city.value.id;
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=667259d3e642f1444ef8a44dc01be273`);
            const data = await res.json();
            setWeather({value: data})
        }
        if(city.value) {
            getWeather()
        }
    },[city.value])

    const getCelsius = (kelvin) => Math.round(kelvin - 273.15) + "°c";
    const getKPH = (miles) =>  Math.round(miles * 1.609);

    let image;
    if(weather.value) {
        image = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.value.weather[0].icon}.png`
    }


    return weather.value ? (
        <Box>
            <Typography 
                variant="h1" 
                component="h2"
                color="textSecondary"
                className={classes.title}
                >
                {getCelsius(weather.value.main.temp)}
            </Typography>
            <Box
                display='flex' 
                flexDirection = 'column'
                justifyContent="space-around"  
                alignItems="center"
                className={classes.text}
            >
                <Box
                    display='flex' 
                    justifyContent="space-around" 
                    alignItems = 'center'
                >
                    <Typography 
                        variant="h3" 
                        component="h2"
                        color="textSecondary"
                        className={classes.city}
                        >
                        {weather.value.name}:
                    </Typography>
                     <img src={image} /></Box>
                <Box>Wind: {getKPH(weather.value.wind.speed)}km/h</Box>
                <Box>Humidity: {weather.value.main.humidity} %</Box>
                <Box>Pressure: {weather.value.main.pressure} hPa</Box>
            </Box>
        </Box>
    ) : null
}

export default DisplayToday;