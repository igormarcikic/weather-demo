import React, { useState, useContext } from 'react';
import { Context } from './../../Context/Context';
import { LoadingStatus } from './../../Context/userActions';
import { addUser } from './../../Context/userActions';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import fb from './../../config/fbConfig';
import { motion } from 'framer-motion';
import {
	Container,
	Box,
	TextField,
	InputAdornment,
	Typography,
	Button,
	CircularProgress 
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
    root: {
    	maxWidth: 400,
    	height: '100vh',
    	display: 'flex',
    	flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
    },
	fonts: {
		fontWeight: '600',
		textDecoration: 'underline',
		textAlign: 'center'
	},
	cursor: {
		cursor: 'pointer'
	}
}));


const LogIn = () => {
    const classes = useStyles();
	const [fieldsState, setFieldsState] = useState({
		email:  null,
		password: null
	})
	const [errorState, setErrorState] = useState({
		value: null
	})
	const [showPassword, setShowPassword] = useState({show: false});

	const {dispatch, user} = useContext(Context);
	const history = useHistory();

	const showPass = () => {
		const showP = showPassword.show;
		setShowPassword({show: !showP})
	}

	const inputFieldHandler = (e) => {
		const currentState = {...fieldsState};
		currentState[e.target.name] = e.target.value;
		setFieldsState(currentState)
	}

	const submitFormHandler = (e) => {
		e.preventDefault()
		const email = fieldsState.email;
		const password = fieldsState.password;
		
		if(email && password) {
			dispatch(LoadingStatus())
			fb.auth().signInWithEmailAndPassword(email, password)
				.then(cred => {
					dispatch(addUser(cred))
					setFieldsState({
						email: null,
						password: null
					})
					console.log(user)
					setErrorState({value: null})
					history.push("/");
				}).catch(err=> {
					setErrorState({value: err.message})
				}) 
		} else {
			setErrorState({value: 'Fill in all fields!'})
		}
	}

	return user.isLoading ?
	(	
		<Container 
		className={classes.root}
		>
			<CircularProgress variant="indeterminate" color="secondary" size="80px" />
		</Container>
	) : (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}
		>
			<Container 
				className={classes.root}
				>
				<Typography 
					variant="h4" 
					component="h2"
					color="textSecondary"
					>
				  	Log In:
				</Typography>
				<form>
			        <TextField
			       		fullWidth
			       		margin = "normal"
			          	placeholder = 'Enter email...'
			          	id="email"
			          	name="email"
			          	label="Email"
			          	helperText=""
			          	variant="outlined"
			          	InputProps={{
				          startAdornment: (
				            <InputAdornment position="start">
				              <EmailIcon color="primary" />
				            </InputAdornment>
				          ),
				        }}
				        onInput={(e)=> inputFieldHandler(e)}
			        />
			        <TextField
						autoComplete="true"
			       		fullWidth
			       		margin = "normal"
			          	placeholder = 'Enter password...'
			          	id="password"
			          	name="password"
			          	label="Password"
			          	helperText=""
			          	variant="outlined"
			          	type={showPassword.show ? "text" : "password"}
			          	InputProps={{
				          startAdornment: (
				            <InputAdornment position="start">
				              <VisibilityOffIcon className={classes.cursor} color="primary" onClick={()=> showPass()} />
				            </InputAdornment>
				          ),
				        }}
				        onInput={(e)=> inputFieldHandler(e)}
			        />
					{errorState ? (<Typography color="error" className={classes.fonts}>{errorState.value}</Typography>) : null }
			        <Box
					   	display='flex' 
						justifyContent="space-around"  
						alignItems="center"
						mt={3}
					>  
				        <Button 
				        	variant="contained" 
				        	color="primary"
				        	onClick={(e)=> submitFormHandler(e)}
				        >
							 Log In
				        </Button>
				        <Button 
				        	variant="contained" 
				        	color="secondary" 
				        	component={Link} to='/signup'>
				        	Sign Up
				        </Button>
				    </Box>
				</form>
			</Container>
			</motion.div>
		)  
}

export default LogIn;