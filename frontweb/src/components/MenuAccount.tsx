import * as React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { Link, useNavigate } from 'react-router-dom'
import { ListItemButton } from '@mui/material'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../atom/currentUserAtom'
import UserAvatar from './users/UserAvatar'
import DashboardIcon from '@mui/icons-material/Dashboard'

const linkStyle = {
  textDecoration: 'none',
  color: 'rgba(0,0,0,0.87)',
}

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          marginLeft: 'auto',
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <UserAvatar user={currentUser} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link to="/dashboard" style={linkStyle}>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Tableau de bord
            </ListItemButton>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/my-account" style={linkStyle}>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Mon compte
            </ListItemButton>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link to="/" style={linkStyle}>
            <ListItemButton onClick={handleLogout} sx={{ p: 0 }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Déconnexion
            </ListItemButton>
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
