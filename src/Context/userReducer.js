import * as actionType from './userActions';

const reducer = (state, action) => {
	switch(action.type) {
		case actionType.ADD_USER: 
			return {
				...state,
				value: action.payload
			}
		case actionType.LOG_OUT:
			return {
				...state,
				value: null
			}
		default: 
			return state
	}
}

export default reducer;