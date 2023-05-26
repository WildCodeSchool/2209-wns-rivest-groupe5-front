import { useMutation } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import * as React from 'react'
import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { uploadPictureToCloudinary } from '../utils/upLoadPictureToCloudinary'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import CREATE_GOOD_DEAL from '../graphql/queries/goodDeals/createGoodDeal'

const GoodDealsForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [link, setLink] = useState('')
  const [imageToUpload, setImageToUpload] = useState<File>()
  const [isSendingImage, setIsSendingImage] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openError, setOpenError] = useState(false)
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)

  const navigate = useNavigate()
  const [createGoodDeal, { loading: loadingGoodDealCreation, error }] =
    useMutation(CREATE_GOOD_DEAL)

  function triggerCreateGoodDeal(cloudinaryLink?: string) {
    return createGoodDeal({
      variables: {
        data: {
          goodDealTitle: title,
          goodDealContent: content,
          goodDealLink: link,
          image: cloudinaryLink ? cloudinaryLink : null,
        },
      },
      onCompleted(data) {
        setIsSendingImage(false)
        setIsSnackBarOpen(true)
        navigate('/good-deals-feed')
      },
      onError(error) {
        setIsSendingImage(false)
        setErrorMsg('La publication a échoué')
        setOpenError(true)
      },
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // check if all required fields are provided
    if (title === '' || content === '') {
      setErrorMsg('Merci de fournir un titre et une description!')
      setOpenError(true)
      return
    }
    // if no image uploaded by user=> create good deal without image
    if (!imageToUpload) {
      triggerCreateGoodDeal()
    } else {
      // if an image was uploaded in the form => send this image to cloudinary to get url
      setIsSendingImage(true)
      const imageUrlFromCloudinary = await uploadPictureToCloudinary(
        imageToUpload
      )
      // if image upload to cloudinary failed => create good deal without image
      if (imageUrlFromCloudinary.includes('Failed to upload picture')) {
        triggerCreateGoodDeal()
      } else {
        // if image upload to cloudinary is successful create good deal with image
        triggerCreateGoodDeal(imageUrlFromCloudinary)
      }
    }
  }

  function handleCloseSnackBar(event: React.SyntheticEvent | Event) {
    setIsSnackBarOpen(false)
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 2, width: '50%', margin: '0 auto' }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 1, textAlign: 'center' }}
        >
          PARTAGER VOS BONS PLANS!
        </Typography>
        <Collapse in={openError} sx={{ mb: 5 }}>
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
            {errorMsg}
          </Alert>
        </Collapse>
        <Stack direction={'column'} spacing={2} sx={{ mb: 1 }}>
          <TextField
            required
            fullWidth
            id="title"
            label="Titre"
            name="title"
            inputProps={{ inputProps: { min: 3, max: 20 } }}
            onChange={(e) => {
              setOpenError(false)
              setTitle(e.target.value)
            }}
            value={title}
          />
          <TextField
            required
            fullWidth
            id="content"
            label="Description"
            name="content"
            multiline={true}
            minRows={4}
            maxRows={4}
            inputProps={{ inputProps: { min: 3, max: 200 } }}
            onChange={(e) => {
              setOpenError(false)
              setContent(e.target.value)
            }}
            value={content}
          />
          <TextField
            fullWidth
            id="link"
            label="Lien"
            name="link"
            inputProps={{ inputProps: { min: 3, max: 200 } }}
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              component="label"
              startIcon={<AccountCircleIcon />}
              sx={{ mt: '10px' }}
            >
              Choisir une photo
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                hidden
                onChange={(event) => {
                  if (event.target.files) {
                    setImageToUpload(event.target.files[0])
                  }
                }}
              />
            </Button>
            <Typography ml={2}>
              {imageToUpload?.name && imageToUpload.name}
            </Typography>
          </Box>
        </Stack>
        <LoadingButton
          type="submit"
          fullWidth
          loading={loadingGoodDealCreation || isSendingImage}
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          id="submit-button"
        >
          Publier
        </LoadingButton>
      </Box>
      <Snackbar
        open={isSnackBarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert sx={{ width: '500px' }} severity={error ? 'error' : 'success'}>
          {error ? 'La publication a échoué' : 'Bon plan publié!'}
        </Alert>
      </Snackbar>
    </>
  )
}

export default GoodDealsForm
