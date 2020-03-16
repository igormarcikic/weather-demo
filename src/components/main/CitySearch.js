import React, { useState } from 'react';
import { 
    TextField,
    CircularProgress
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const CitySearch = (props) => {
    const [cities, setCitiesList] = useState([])
    const [open, setOpen] = useState({value: false});
    const [loading, setLoading] = useState({value: false})

    const getCities = async () => {
        const res = await fetch('./API/cityList.json');
        const data = await res.json()
        setCitiesList(data);
        setLoading({value: false});
    }

    return (
        <>
            <Autocomplete
                options={cities}
                getOptionLabel={option => option.city}
                open={open.value}
                style={{ width: 300 }}
                renderInput={params => 
                    <TextField {...params} label="City Search" variant="outlined" name="city"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                            <>
                                {loading.value ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                            ),
                        }}
                    />}
                loading={loading.value} 
                onOpen={() => {
                    setOpen({value: true});
                    setLoading({value: true});
                    getCities()
                    
                }}
                onClose={() => {
                    setOpen({value: false});
                    setCitiesList([])
                }}
                onChange={(e, value)=> props.findCity(value)}
            />
        </>
    )
}

export default CitySearch;
