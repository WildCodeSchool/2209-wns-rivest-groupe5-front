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
<<<<<<< HEAD
import Card from '@mui/material/Card';
=======
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import * as React from 'react';
import Header from '../components/Header';
import FirstPart from '../components/FirstPart';
>>>>>>> 9c4ec9b925d044931f0a1385a70bf744b53735ae

const HomePage = () => {

  return (
    <div>
<<<<<<< HEAD
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" sx={{width: '100%'}}>
          <Card
            sx={{
              pt: 4,
              pb: 4,
              pr: 3,
              pl: 3,
              width: '100%',
              borderRadius: 4,
              border: '1px solid',
              borderColor: '#90CAF9',
              height: '25rem',
            }}
          >
            BLABLABLA
          </Card>
        </Stack>

        <Stack direction="row" spacing={5} width="100%" sx={{mt: 5}}>
          <Card
            sx={{
              pt: 4,
              pb: 4,
              pr: 3,
              pl: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: '#90CAF9',
              width: '50rem',
            }}
          >
            BLABLABLA BLABLABLA BLABLABLA BLABLABLA BLABLABLA BLABLABLA
            BLABLABLA BLABLABLA
          </Card>
          <Card
            sx={{
              pt: 4,
              pb: 4,
              pr: 3,
              pl: 3,
              borderRadius: 4,
              border: '1px solid',
              borderColor: '#90CAF9',
              width: '50rem',
            }}
          >
            BLABLABLA BLABLABLA BLABLABLA BLABLABLA BLABLABLA
          </Card>
        </Stack>
      </Container>
=======
      <Header />
      <FirstPart />
>>>>>>> 9c4ec9b925d044931f0a1385a70bf744b53735ae
    </div>
  );
};

export default HomePage;
