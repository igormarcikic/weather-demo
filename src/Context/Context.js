import React, { createContext, useReducer } from 'react';
import UserReducer from './userReducer';

export const Context = createContext();
const initialUserState = {
	value: null,
	isLoading: false
};

const Provider = (props) => {
	const [user, dispatch] = useReducer(UserReducer, initialUserState);

	return (
			<Context.Provider value={{user, dispatch}}>
				{props.children}
			</Context.Provider>
		)
}

export default Provider;