import { useState,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import LoginPage from '../User/LoginPage';
import MyTeam from '../User/MyTeam';
import { Container } from 'react-bootstrap';
import HomeIcon from '@mui/icons-material/Home';

export default function ButtonAppBar() {
  const [auth, setAuth] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setAuth(true);
    }
  }, [])

  const handleLogout = () => {

   fetch('http://127.0.0.1:8000/auth/logout/', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `Token ${localStorage.getItem('token')}`
     }
   })
     .then(res => res.json())
     .then(data => {
       console.log(data);
       localStorage.clear();
       window.location.replace('http://localhost:3000/');
     });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            futQ
          </Typography>
          { auth ?
          <div>            
            <Button color="inherit" href="/myteam">
              My Team
            </Button>            
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          : 
          <Button color="inherit" href="/login">
            Login
          </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
