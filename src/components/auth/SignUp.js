import React, { useState, useContext } from 'react';
import { Context } from './../../Context/Context';
import { addUser } from './../../Context/userActions';
import { makeStyles } from '@material-ui/core/styles';
import fb from './../../config/fbConfig';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	Container,
	Box,
	TextField,
	InputAdornment,
	Typography,
	Button 
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
    root: {
    	maxWidth: 400,
    	height: '100vh',
    	display: 'flex',
    	flexDirection: 'column',
    	justifyContent: 'center'
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


const SignUp = () => {
    const classes = useStyles();
	const [fieldsState, setFieldsState] = useState({
		name: '',
		username: '',
		email: '',
		password: ''
	})
	const [errorState, setErrorState] = useState({
		value: null
	})
	const [showPassword, setShowPassword] = useState({show: false});

	const {userDispatch} = useContext(Context);
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
		const name = fieldsState.name;
		const username = fieldsState.username;
		const email = fieldsState.email;
		const password = fieldsState.password;
		
		if(name && username && email && password) {
			let ref = fb.firestore().collection('users').doc(username);
			ref.get()
				.then(doc=> {
					if(doc.exists) {
						setErrorState({value: 'Username already exists!'})
					} else {
						fb.auth().createUserWithEmailAndPassword(email, password)
						.then(cred => {
							console.log(cred)
							fb.firestore().collection('users').doc(username)
								.set({
									name: name,
									username: username,
									email: email,
									id: cred.user.uid
								}).then(()=> {
									console.log('success')
								}).catch(err=>{
									console.log(err.message)
								})

							userDispatch(addUser(cred))
			
							setFieldsState({
								name: null,
								username: null,
								email: null,
								password: null
							})
							setErrorState({value: null})
							history.push("/");
						}).catch(err=>{
							setErrorState({value: err.message})
						})
					}
				})
		} else {
			setErrorState({value: 'Fill in all fields!'})
		}
	}

	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{
				type: "spring",
				stiffness: 160,
				damping: 20
			}}
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
				  	Sign Up:
				</Typography>
				<form id="signupForm">
					 <TextField
			       		fullWidth
			       		margin = "normal"
			          	placeholder = 'Enter your name...'
			          	id="name"
			          	name="name"
			          	label="Name"
			          	helperText=""
						variant="outlined"
						value={fieldsState.name}  
			          	InputProps={{
				          startAdornment: (
				            <InputAdornment position="start">
				              <PersonIcon color="primary" />
				            </InputAdornment>
				          ),
				        }}
				        onInput={(e)=> inputFieldHandler(e)}
			        />
			        <TextField
			       		fullWidth
			       		margin = "normal"
			          	placeholder = 'Enter username...'
			          	id="username"
			          	name="username"
			          	label="Username"
			          	helperText=""
			          	variant="outlined"
						value={fieldsState.username}  
			          	InputProps={{
				          startAdornment: (
				            <InputAdornment position="start">
				              <AccountBoxIcon color="primary" />
				            </InputAdornment>
				          ),
				        }}
				        onInput={(e)=> inputFieldHandler(e)}
			        />
			        <TextField
			       		fullWidth
			       		margin = "normal"
			          	placeholder = 'Enter email...'
			          	id="email"
			          	name="email"
			          	label="Email"
			          	helperText=""
			          	variant="outlined"
						value={fieldsState.email}  
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
			       		fullWidth
			       		margin = "normal"
			          	placeholder = 'Enter password...'
			          	id="password"
			          	name="password"
			          	label="Password"
			          	helperText=""
						variant="outlined"
						value={fieldsState.password} 
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
				        	Sign Up
				        </Button>
				        <Button 
				        	variant="contained" 
				        	color="secondary" 
				        	component={Link} to='/login'>
				        	Log In
				        </Button>
				    </Box>
				</form>
			</Container>
			</motion.div>
		)
}

export default SignUp;