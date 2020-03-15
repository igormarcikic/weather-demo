import React, { createContext, useReducer } from 'react';
import UserReducer from './userReducer';

export const Context = createContext();
const initialUserState = {
	value: null
};

const Provider = (props) => {
	const [user, userDispatch] = useReducer(UserReducer, initialUserState);

	return (
			<Context.Provider value={{user, userDispatch}}>
				{props.children}
			</Context.Provider>
		)
}

export default Provider;