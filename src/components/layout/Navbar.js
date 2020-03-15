import React, { useState, useContext } from 'react';
import { Context } from './../../Context/Context';
import { logOutUser } from './../../Context/userActions';
import fb from './../../config/fbConfig';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Box,
    Button,
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    SwipeableDrawer, 
    MenuList,
    MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: 26
    },
    title: {
        flexGrow: 1,
    },
    linksList: {
        width: 200,
    },
    buttons: {
        fontWeight: 500,
        fontSize: 17
    }
}));


const Navbar = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        menuOpen: false
    });
    const { user, userDispatch } = useContext(Context);
    const history = useHistory();

    const signedInLinks = [{
        name: 'Main',
        icon: 'DashboardIcon',
        path: '/'
      },{
        name: 'Profile',
        icon: 'AccountCircleIcon',
        path: '/profile'
      }]
    
      const signedOutLinks = [{
        name: 'Sign Up',
        icon: 'AccountBoxIcon',
        path: '/signup'
      },{
        name: 'Log In',
        icon: 'AccountCircleIcon',
        path: '/login'
      }]

    const getIconHandler = icon => {
        switch(icon){
            case 'Main':
                return(<DashboardIcon className={classes.menuButton}/>);
            case 'Profile':
            case 'Log In':
                return (<AccountCircleIcon className={classes.menuButton}/>)
            case 'Log Out':
                return (<ExitToAppIcon className={classes.menuButton}/>)
            case 'Sign Up':
                return (<AccountBoxIcon className={classes.menuButton}/>)
            default: 
                return(<DashboardIcon className={classes.menuButton}/>);
        }
    }

    const logOut = () => {
        fb.auth().signOut().then(()=>{
            userDispatch(logOutUser());
            history.push("/");
        }).catch(err=>{
            console.log(err.message)
        })
    }
    

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, menuOpen: open });
    };

    const sideList = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {/* <List className={classes.list}>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider /> */}

        <MenuList className={classes.linksList}>
          {user.value ? signedInLinks.map((link, index)=>(
            <MenuItem button component={Link} to={link.path} key={index}>
              {getIconHandler(link.name)} 
              <Box fontSize={16} ml={1}>{link.name}</Box>
            </MenuItem>
            )) : signedOutLinks.map((link, index)=>(
            <MenuItem button component={Link} to={link.path} key={index}>
              {getIconHandler(link.name)}
              <Box fontSize={16} ml={1}>{link.name}</Box>
            </MenuItem>
            ))}
        </MenuList>


        </div>
    );



    return (
        <div className={classes.root}>
            {/* App bar start */}
            <AppBar position="fixed" color="primary" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="primary" variant="contained" component={Link} to="/" className={classes.buttons}>
                            Weather App
                        </Button>
                    </Typography>
                    {user.value ? 
                        <Box 
                            display="flex"
                            >
                            <Button 
                                color="inherit"
                                >{user.value.user.email}
                            </Button> 
                            <Button 
                                color="inherit" 
                                onClick={()=> logOut()}
                                >Logout
                            </Button>
                        </Box> : null}
                </Toolbar>
            </AppBar>
            {/* App bar end */}

            {/* Drawer start */}
            <SwipeableDrawer
                open={state.menuOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {sideList()}
            </SwipeableDrawer>
            {/* Drawer end */}
        </div>
    );
}


export default Navbar;