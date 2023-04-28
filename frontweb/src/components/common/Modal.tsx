import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Card, CardActions, CardContent } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import WarningIcon from '@mui/icons-material/Warning'
import { orange } from '@mui/material/colors'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
}

interface Props {
  openModal: boolean
  handleClose: () => void
  title?: string
  text: string
  buttonText: string
  action: () => void
  iconType: 'success' | 'error' | 'info'
}

const BasicModal = ({
  openModal,
  handleClose,
  title,
  text,
  buttonText,
  action,
  iconType,
}: Props) => {
  let iconToDisplay
  switch (iconType) {
    case 'success':
      iconToDisplay = <CheckCircleIcon color="success" fontSize="large" />
      break
    case 'error':
      iconToDisplay = <WarningIcon color="error" fontSize="large" />
      break
    case 'info':
      iconToDisplay = (
        <WarningIcon sx={{ color: orange[500] }} fontSize="large" />
      )
  }

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      id="modal-success"
    >
      <Card sx={style}>
        <CardContent>
          <Box
            sx={{ display: 'flex', justifyContent: 'end' }}
            onClick={() => handleClose()}
            style={{ cursor: 'pointer' }}
            title="Fermer"
          >
            <HighlightOffIcon style={{ color: 'grey' }} fontSize="medium" />
          </Box>
          {title && (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              marginBottom={5}
            >
              {title}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {iconToDisplay}
            <Typography variant="body1" color="text.secondary" ml={2}>
              {text}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => action()}
            data-test-id="ok-button"
            color="primary"
            sx={{ ml: 'auto' }}
          >
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  )
}

export default BasicModal
