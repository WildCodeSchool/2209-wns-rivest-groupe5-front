import { useLazyQuery } from '@apollo/client'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { currentUserState } from '../atom/currentUserAtom'
import { useRecoilState } from 'recoil'
import forestpicture from '../assets/login-picture.jpg'

import {
  Grid,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Link,
  InputAdornment,
  IconButton,
  Collapse,
  Alert,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { GET_TOKEN_LOGIN } from '../graphql/queries/users/getTokenQuery'

const LoginPage = () => {
  const [user, setUser] = useRecoilState(currentUserState)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [openError, setOpenError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const navigate = useNavigate()

  const [getToken, { loading }] = useLazyQuery(GET_TOKEN_LOGIN)

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await getToken({
      variables: { email, password },
      onCompleted(data) {
        localStorage.setItem('token', data.getToken.token)
        setUser(data.getToken.userFromDB)
        navigate('/dashboard')
      },
      onError(error) {
        console.log(error)
        setOpenError(true)
      },
    })
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          pt: 20,
          pb: 5,
          pr: 4,
          pl: 4,
          width: '50%',
          backgroundColor: 'white',
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
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Connectez-vous à votre compte Wildcarbon
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
                    setOpenError(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Un problème est survenu lors de la connexion. Vérifiez votre
              adresse e-mail et votre mot de passe ou créez un compte.
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
              label="E-mail"
              name="email"
              autoComplete="email"
              onChange={handleEmail}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              id="password"
              data-testid="password"
              label="Mot de passe"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
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
              Se connecter
            </LoadingButton>
            <Grid container mt={5}>
              <Grid item xs>
                <Link
                  onClick={() => navigate('/resetPassword/stepOne')}
                  style={{ cursor: 'pointer' }}
                >
                  Mot de passe oublié?
                </Link>
              </Grid>
              <Grid item xs sx={{ textAlign: 'end' }}>
                <Link
                  onClick={() => navigate('/register')}
                  style={{ cursor: 'pointer' }}
                >
                  Créer un compte?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '50%', maxHeight: '100vh' }}>
        <img
          alt="forest"
          src={forestpicture}
          style={{
            width: '50vw',
            height: '100vh',
            objectFit: 'cover',
          }}
        />
      </Box>
    </div>
  )
}

export default LoginPage
