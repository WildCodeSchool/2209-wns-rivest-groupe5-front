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
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
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
    <Link to="/good-deals-feed" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DynamicFeedIcon />
        </ListItemIcon>
        <ListItemText primary="Tous les bons plans" />
      </ListItemButton>
    </Link>
    <Link to="/my-good-deals" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Mes bons plans" />
      </ListItemButton>
    </Link>
    <Link to="/good-deals-form" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Créer un bon plan" />
      </ListItemButton>
    </Link>
  </React.Fragment>
)
