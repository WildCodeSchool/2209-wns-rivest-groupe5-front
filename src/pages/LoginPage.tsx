import { gql, useLazyQuery } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { currentUserState } from "../atom/currentUserAtom";
import {
  useRecoilState,
} from 'recoil';

import {
  Card,
  Grid,
  CardHeader,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Collapse,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";

const GET_TOKEN_LOGIN = gql`
  query GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
      token
      userFromDB {
        userId
        email
        firstname
        lastname
      }
    }
  }
`;

const LoginPage = () => {
  const [user, setUser] = useRecoilState(currentUserState)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const [getToken, { loading, error }] = useLazyQuery(GET_TOKEN_LOGIN);

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getToken({
      variables: { email, password },
      onCompleted(data) {
        localStorage.setItem("token", data.getToken.token);
        localStorage.setItem("user", JSON.stringify(data.getToken.userFromDB));
        setUser(data.getToken.userFromDB);
        navigate("/dashboard");
      },
      onError(error) {
        console.log(error);
        setOpenError(true);
      },
    });
  }

  return (
    <div>
      <Header />
      <Wrapper>
        <Container component="main" maxWidth="xs" sx={{ pt: 5 }}>
          <Card
            sx={{
              pt: 5,
              pb: 5,
              pr: 4,
              pl: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "#90CAF9",
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Sign in
              </Typography>
              <Collapse in={openError}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenError(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Error during login
                </Alert>
              </Collapse>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmail}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  loading={loading}
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Login
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Container>
      </Wrapper>
    </div>
  );
};

export default LoginPage;
