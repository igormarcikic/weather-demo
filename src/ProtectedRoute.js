import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context/Context';

const ProtectedRoute = ({component: Component, ...rest}) => {

    const {user} = useContext(Context);

    return (
        <Route 
            {...rest}
            render = {
                (props) => {
                    if(user.value) {
                        return <Component { ...props } />
                    } else {
                        return <Redirect to={'/login'}/>
                    }
                }
            }
        />
    )
}

export default ProtectedRoute;
