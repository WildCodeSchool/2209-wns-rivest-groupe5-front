import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Link } from 'react-router-dom'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import AddIcon from '@mui/icons-material/Add'
import Co2Icon from '@mui/icons-material/Co2'
import PeopleIcon from '@mui/icons-material/People'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Divider } from '@mui/material'

const linkStyle = {
  textDecoration: 'none',
  color: 'rgba(0,0,0,0.87)',
}

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Tableau de bord" />
      </ListItemButton>
    </Link>
    <Divider />
    <ListItemText
      primaryTypographyProps={{
        fontSize: 15,
        fontWeight: 'medium',
        lineHeight: '20px',
        m: '20px',
      }}
      sx={{ my: 0 }}
    >
      Activités
    </ListItemText>
    <Link to="/my-activities" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <Co2Icon />
        </ListItemIcon>
        <ListItemText primary="Mes activités" />
      </ListItemButton>
    </Link>

    <Link to="/create-activity" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Créer une activité" />
      </ListItemButton>
    </Link>

    <Link to="/followed-activities-feed" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Activités Abonnements" />
      </ListItemButton>
    </Link>
    <Divider />
    <ListItemText
      primaryTypographyProps={{
        fontSize: 15,
        fontWeight: 'medium',
        lineHeight: '20px',
        m: '20px',
      }}
      sx={{ my: 0 }}
    >
      Astuces
    </ListItemText>
    <Link to="/good-deals-feed" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DynamicFeedIcon />
        </ListItemIcon>
        <ListItemText primary="Toutes les astuces" />
      </ListItemButton>
    </Link>
    <Link to="/my-good-deals" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Mes astuces" />
      </ListItemButton>
    </Link>
    <Link to="/good-deals-form" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Créer une astuce" />
      </ListItemButton>
    </Link>
  </React.Fragment>
)
