import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserInterface } from "../interfaces/user";
import Wrapper from '../components/Wrapper';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import {Visibility, VisibilityOff} from '@mui/icons-material';
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
  Stack
} from '@mui/material';

const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      userId
      firstname
      lastname
      email
    }
  }
`;

const RegisterPage = () => {
  const [openError, setOpenError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('')
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
  const [passwordsMatching, setPasswordsMatching] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserInterface>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const navigate = useNavigate();
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOpenError(false)
    setPasswordsMatching(true);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { password, passwordconfirm } = userData;
    console.log(userData)
    if (userData.email === '' || userData.firstname === '' || userData.lastname === '' || userData.password === '' || userData.passwordconfirm === '') {
      setPasswordsMatching(false);
      setErrorMsg('Please fill in all required fields !');
      setOpenError(true);
    } else if (password !== passwordconfirm) {
      setErrorMsg('Passwords do not match !');
      setOpenError(true);
    } else {
      createUser({
        variables: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          password: userData.password,
        },
        onCompleted(data) {
          alert('Account created with success');
          navigate('/login');
        },
        onError(error) {
          setErrorMsg(error.message);
          setOpenError(true);
        },
      });
    }
  }

  if (error) {
    setErrorMsg('Error when trying to register')
  }


  return (
    <div>
        <Container component="main" maxWidth="md" sx={{pt: 5}}>
          <Card
            sx={{
              pt: 4,
              pb: 4,
              pr: 5,
              pl: 5,
              borderRadius: 4,
              border: '1px solid',
              borderColor: '#90CAF9',
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{mb: 1}}>
                Register
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
                  {errorMsg}
                </Alert>
              </Collapse>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{mt: 2}}
              >
                <Stack direction="row" spacing={2} sx={{mb: 1}}>
                  <TextField
                    required
                    fullWidth
                    id="firstname"
                    label="Firstname"
                    name="firstname"
                    autoComplete="firstname"
                    onChange={handleChange}
                    value={userData.firstname}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="Lastname"
                    name="lastname"
                    autoComplete="lastname"
                    onChange={handleChange}
                    value={userData.lastname}
                  />
                </Stack>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={userData.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={userData.password}
                  onChange={handleChange}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordconfirm"
                  id="passwordconfirm"
                  label="Password Confirm"
                  variant="outlined"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={userData.passwordconfirm}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                        >
                          {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
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
                  sx={{mt: 2, mb: 2}}
                >
                  Create account
                </LoadingButton>
              </Box>
            </Box>
          </Card>
        </Container>
    </div>
  );
};

export default RegisterPage;
