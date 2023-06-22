import { useMutation, useQuery } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from 'react'
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
import { uploadPictureToCloudinary } from '../utils/upLoadPictureToCloudinary'
import { LoadingButton } from '@mui/lab'
import { useNavigate, useParams } from 'react-router-dom'
import Wysiwyg from '../components/Wysiwyg'
import { GET_GOOD_DEAL } from '../graphql/queries/goodDeals/getGoodDeal'
import UPDATE_GOOD_DEAL from '../graphql/mutations/goodDeals/updateGoodDeal'
import { theme } from '../assets/Styles/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../atom/currentUserAtom'
import GoBackButton from '../components/GoBackButton'

const GoodDealEdit = () => {
  const { goodDealId } = useParams()
  const currentUser = useRecoilValue(currentUserState)

  // récupérer le good deal à modifier
  const { data, error, loading } = useQuery(GET_GOOD_DEAL, {
    variables: { id: parseInt(`${goodDealId}`) },
    fetchPolicy: 'no-cache',
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [imageToUpload, setImageToUpload] = useState<File>()
  const [isSendingImage, setIsSendingImage] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openError, setOpenError] = useState(false)
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      if (
        !data?.getGoodDeal ||
        currentUser === null ||
        data?.getGoodDeal?.user.userId !== currentUser.userId
      ) {
        navigate('/')
      }
    }
  }, [currentUser, data, navigate])

  useEffect(() => {
    if (data?.getGoodDeal) {
      const {
        goodDealTitle,
        goodDealLink,
        goodDealContent,
        goodDealDescription,
      } = data.getGoodDeal

      setTitle(goodDealTitle ?? '')
      setContent(goodDealContent ?? '')
      setDescription(goodDealDescription ?? '')
      setLink(goodDealLink ?? '')
    }
  }, [data])

  const [updateGoodDeal, { loading: loadingGetGoodDeal }] =
    useMutation(UPDATE_GOOD_DEAL)

  function triggerUpdateGoodDeal(cloudinaryLink?: string) {
    return updateGoodDeal({
      variables: {
        data: {
          goodDealTitle: title,
          goodDealContent: content,
          goodDealDescription: description,
          goodDealLink: link,
          image: cloudinaryLink ? cloudinaryLink : data.getGoodDeal.image,
        },
        goodDealId: parseInt(`${goodDealId}`),
      },
      onCompleted(data) {
        setIsSendingImage(false)
        setIsSnackBarOpen(true)
        navigate(`/good-deal/${goodDealId}`)
      },
      onError(error) {
        setIsSendingImage(false)
        setErrorMsg('La mise à jour a échoué')
        setOpenError(true)
      },
    })
  }

  const handleWysiwygChange = (content: string | undefined) => {
    if (content !== undefined) {
      setContent(content)
    }
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
      triggerUpdateGoodDeal()
    } else {
      // if an image was uploaded in the form => send this image to cloudinary to get url
      setIsSendingImage(true)
      const imageUrlFromCloudinary = await uploadPictureToCloudinary(
        imageToUpload
      )
      // if image upload to cloudinary failed => create good deal without image
      if (imageUrlFromCloudinary.includes('Failed to upload picture')) {
        triggerUpdateGoodDeal()
      } else {
        // if image upload to cloudinary is successful create good deal with image
        triggerUpdateGoodDeal(imageUrlFromCloudinary)
      }
    }
  }

  function handleCloseSnackBar(event: React.SyntheticEvent | Event) {
    setIsSnackBarOpen(false)
  }

  const handleDeleteImage = async () => {
    await updateGoodDeal({
      variables: {
        data: {
          image: '',
        },
        goodDealId: parseInt(`${goodDealId}`),
      },
      onCompleted(data) {
        setIsSendingImage(false)
        setIsSnackBarOpen(true)
        window.location.reload() // force reload to update data
      },
      onError(error) {
        setIsSendingImage(false)
        setErrorMsg('La mise à jour a échoué')
        setOpenError(true)
      },
    })
  }

  if (loading) {
    return <div>Récupération du bon plan...</div>
  }

  if (!data?.getGoodDeal) {
    return <div>Aucun bon plan n'a été trouvé.</div>
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 2, width: '50%', margin: '0 auto' }}
      >
        <GoBackButton redirectUrl={`/good-deal/${goodDealId}`} />
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 1, textAlign: 'center' }}
        >
          Mettre à jour le bon plan
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
            InputProps={{ inputProps: { min: 3, max: 20 } }}
            onChange={(e) => {
              setOpenError(false)
              setTitle(e.target.value)
            }}
            value={title}
          />
          <TextField
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline={true}
            minRows={4}
            maxRows={4}
            inputProps={{ inputProps: { min: 3, max: 200 } }}
            onChange={(e) => {
              setOpenError(false)
              setDescription(e.target.value)
            }}
            value={description}
          />
          <Wysiwyg
            content={content}
            placeholder="Contenu du bon plan *"
            handler={handleWysiwygChange}
          />
          <TextField
            fullWidth
            id="link"
            label="Lien"
            name="link"
            InputProps={{ inputProps: { min: 3, max: 200 } }}
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
            {data?.getGoodDeal?.image ? (
              <div
                style={{
                  marginRight: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography>Image actuelle</Typography>
                <img
                  src={data?.getGoodDeal?.image}
                  alt="Illustration du bon plan"
                  style={{ maxWidth: '250px', maxHeight: '250px' }}
                />
                <Button
                  component="label"
                  style={{
                    backgroundColor: theme.palette.warning.main,
                    color: '#fff',
                    marginTop: 2,
                  }}
                  size="small"
                  onClick={handleDeleteImage}
                >
                  Supprimer l'image
                </Button>
              </div>
            ) : !imageToUpload ? (
              <p style={{ marginRight: 4 }}>Aucune image pour le moment</p>
            ) : (
              <></>
            )}

            {imageToUpload && (
              <div style={{ marginLeft: 4 }}>
                <Typography>Nouvelle Image</Typography>
                <img
                  style={{ maxWidth: '250px', maxHeight: '250px' }}
                  src={URL.createObjectURL(imageToUpload)}
                  alt="Illustration du bon plan"
                />
                <Typography fontSize={14}>
                  {imageToUpload?.name && imageToUpload.name}
                </Typography>
              </div>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button variant="outlined" component="label">
              Choisir une image
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
          </Box>
        </Stack>
        <LoadingButton
          type="submit"
          fullWidth
          loading={loadingGetGoodDeal || isSendingImage}
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          id="submit-button"
        >
          Mettre à jour
        </LoadingButton>
      </Box>
      <Snackbar
        open={isSnackBarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert sx={{ width: '500px' }} severity={error ? 'error' : 'success'}>
          {error ? 'La mise à jour a échoué' : 'Bon plan mis à jour!'}
        </Alert>
      </Snackbar>
    </>
  )
}

export default GoodDealEdit
