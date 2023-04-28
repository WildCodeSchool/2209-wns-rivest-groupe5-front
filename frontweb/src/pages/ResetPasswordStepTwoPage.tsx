import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useLocation } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

const RESET_PASSWORD = gql`
  mutation Mutation($password: String!, $resetToken: String!) {
    resetPassword(password: $password, resetToken: $resetToken)
  }
`

const ResetPasswordStepTwoPage = () => {
  const [newPassword, setNewPassword] = useState('')
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD)
  const navigate = useNavigate()
  //get the resetToken from current url pathname
  const { pathname } = useLocation()
  const splittedPathname = pathname.split('/')
  const resetToken = splittedPathname[splittedPathname.length - 1].trim()

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    await resetPassword({
      variables: {
        password: newPassword,
        resetToken,
      },
      onCompleted() {
        alert('Mot de passe mis à jour avec succès')
        navigate('/login')
      },
      onError(error) {
        alert(`Password change failed: ${error.message}`)
      },
    })
  }

  return (
    <Box
      sx={{
        background: '#FFFFFF',
        width: '30%',
        margin: '10px auto 10px auto',
        padding: '20px 20px 0px 20px',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '40px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          alignContent: 'center',
          textAlign: 'center',
          fontSize: '20px',
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        Changer de mot de passe
      </Typography>
      <TextField
        type={'email'}
        required
        variant="outlined"
        id="newPassword"
        label="Nouveau mot de passe"
        helperText="Saisissez votre nouveau mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <LoadingButton
        variant="contained"
        sx={{ marginTop: '20px' }}
        loading={loading}
        disabled={loading}
        onClick={handleSubmit}
      >
        Changer mot de passe
      </LoadingButton>
      <Button>Annuler</Button>
    </Box>
  )
}

export default ResetPasswordStepTwoPage
