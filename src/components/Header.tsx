import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import {AppBar, Box, Typography, Button} from '@mui/material';

export default function Header() {
  

  const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'rgba(0,0,0,0.87)',
  };

  return (
    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Box sx={{flex: 1}} />
        <Link to={'/'} style={linkStyle}>
          <Typography fontSize={20}>WildCarbon</Typography>
        </Link>
        <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            color="secondary"
            disabled={false}
            size="medium"
            variant="outlined"
            component={Link}
            to="/login"
          >
            Sign in
          </Button>
          <Button
            color="secondary"
            disabled={false}
            size="medium"
            variant="contained"
            sx={{ml: 2}}
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
