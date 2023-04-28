import { gql, useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const REQUEST_RESET_PASS_LINK = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ResetPasswordStepOnePage = () => {
  const [email, setEmail] = useState('')
  const [requestResetPassLink, { loading, error }] = useMutation(
    REQUEST_RESET_PASS_LINK
  )
  const navigate = useNavigate()

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    await requestResetPassLink({
      variables: { email },
      onCompleted() {
        //shop pop up telling to check inbox mail
        alert('Vérifiez vos emails')
        //redirect to login page
        navigate('/')
      },
      onError(error) {
        console.log('>>error request reset password link >>>', error.message)
        alert('La demande a échoué, vérifier votre saisie')
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
      <TextField
        required
        variant="outlined"
        helperText="Renseigner votre adresse email"
        id="email"
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <LoadingButton
        variant="contained"
        sx={{ marginTop: '20px' }}
        loading={loading}
        disabled={loading}
        onClick={handleSubmit}
      >
        Réinitialiser mon mot de passe
      </LoadingButton>
    </Box>
  )
}

export default ResetPasswordStepOnePage
