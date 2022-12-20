import {
  Button,
  Stack,
  CssBaseline,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import * as React from 'react';
import Header from '../components/Header';
import FirstPart from '../components/FirstPart';

const HomePage = () => {

  return (
    <div>
      <Header />
      <FirstPart />
    </div>
  );
};

export default HomePage;
