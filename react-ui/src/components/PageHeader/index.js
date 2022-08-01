import { useState,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import axios from '../../lib/axios'
import HomeIcon from '@mui/icons-material/Home';

var USER_INFO;
export default function ButtonAppBar() {
  const [auth, setAuth] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setAuth(true);      
      axios.post('auth/get/user/')     
      .then((result)=>USER_INFO = result.data)
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
             <Button color="inherit" href="/squad">
              My Squads
            </Button>
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
