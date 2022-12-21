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
import Card from '@mui/material/Card';

const HomePage = () => {

  return (
    <div>
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
    </div>
  );
};

export default HomePage;
