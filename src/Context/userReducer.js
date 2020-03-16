import * as actionType from './userActions';

const reducer = (state, action) => {
	switch(action.type) {
		case actionType.ADD_USER: 
			return {
				...state,
				value: action.payload,
				isLoading: false
			}
		case actionType.LOG_OUT:
			return {
				...state,
				value: null
			}
		case actionType.LOADING:
			return {
				...state,
				isLoading: true
			}
		default: 
			return state
	}
}

export default reducer;