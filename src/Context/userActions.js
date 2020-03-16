export const ADD_USER = 'ADD_USER';
export const LOG_OUT = 'LOG_OUT';
export const LOADING = 'LOADING';

export const addUser = (data) => {
	return {
		type: ADD_USER,
		payload: data
	}
}

export const logOutUser = () => {
	return {
		type: LOG_OUT,
	}
}

export const LoadingStatus = () => {
	return {
		type: LOADING
	}
}