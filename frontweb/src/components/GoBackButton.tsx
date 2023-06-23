import { Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { To, useNavigate } from 'react-router-dom'

const GoBackButton = ({
  redirectUrl,
  customLabel = 'Retour',
}: {
  redirectUrl: To
  customLabel?: string
}) => {
  const navigate = useNavigate()

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        navigate(redirectUrl)
      }}
    >
      <ArrowBackIcon sx={{ mr: 2 }} />
      {customLabel}
    </Stack>
  )
}

export default GoBackButton
