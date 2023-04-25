import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { AppBar, Box, Typography, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {useNavigate} from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={16}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderRadius: "20px",
        bgcolor: "primary.main",
        paddingY: "10px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography onClick={() => {navigate('/')}} sx={{ fontWeight: "bold", fontSize: "40px" }}>
          WildCarbon
        </Typography>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{bgcolor:"white"}}
            startIcon={<LoginIcon/>}
            size="medium"
            component={Link}
            to="/login"
          >
            Connexion
          </Button>
          <Button
            variant="contained"
            sx={{bgcolor:"white", ml: 2 }}
            startIcon={<HowToRegIcon/>}
            size="medium"
            component={Link}
            to="/register"
          >
            S'inscrire
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
