import React from 'react';
import Today from './Today';
import Forecast from './Forecast';
import {
    Container
} from '@material-ui/core';


const Main = () => {

    return (
        <main>
            <Container>
                <Today />
            </Container>
        </main>
    )
}

export default Main;