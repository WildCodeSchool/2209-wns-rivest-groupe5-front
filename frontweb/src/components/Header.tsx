import Toolbar from '@mui/material/Toolbar'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import AccountMenu from './MenuAccount'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../atom/currentUserAtom'
import wildCarbonLogo from '../assets/wildcarbon_logo.png'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const currentUser = useRecoilValue(currentUserState)

  const buttons = (
    <>
      <Button
        variant="contained"
        sx={{ bgcolor: 'white' }}
        startIcon={<LoginIcon />}
        size="medium"
        component={Link}
        to="/login"
      >
        Connexion
      </Button>
      <Button
        variant="contained"
        sx={{ bgcolor: 'white', ml: 2 }}
        startIcon={<HowToRegIcon />}
        size="medium"
        component={Link}
        to="/register"
      >
        S'inscrire
      </Button>
    </>
  )

  const render =
    currentUser?.firstname !== undefined ? <AccountMenu /> : buttons

  const navigate = useNavigate()

  return (
    <AppBar
      position="static"
      elevation={16}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: '20px',
        bgcolor: 'primary.main',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          onClick={() => {
            navigate('/')
          }}
          sx={{
            display: 'flex',
            height: '90px',
            margin: '0 0',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <img
            src={wildCarbonLogo}
            alt="wildcarbon-logo"
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {render}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
