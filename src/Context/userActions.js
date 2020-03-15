export const ADD_USER = 'ADD_USER';
export const LOG_OUT = 'LOG_OUT'

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
