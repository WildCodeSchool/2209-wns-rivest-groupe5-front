import { gql, useMutation } from '@apollo/client'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import CircularProgress from '@mui/material/CircularProgress'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Typography } from '@mui/material'

async function uploadPictureToCloudinary(fileToUpload: File) {
  try {
    const formData = new FormData()
    formData.append('file', fileToUpload)
    // const endpoint = manifest?.debuggerHost && `http://${manifest.debuggerHost.split(":").shift()}:4040/upload`;
    const endpoint = 'http://localhost:4040/upload'
    const response = await axios({
      method: 'post',
      url: endpoint,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // console.log(">>>>URL FROM CLOUDINARY", response.data.secure_url);
    return response.data.secure_url
  } catch (error) {
    console.log('>>>error uploading file>>>', error)
    alert('Picture upload failed')
  }
}

const CREATE_GOOD_DEAL = gql`
  mutation CreateGoodDeal($data: CreateGoodDealInput!) {
    createGoodDeal(data: $data) {
      goodDealTitle
      goodDealContent
      goodDealLink
      image
    }
  }
`

const errorStyle = { color: 'red', fontSize: '10px' }

const GoodDealsForm = () => {
  const [fileCloudinaryUrl, setFileCloudinaryUrl] = useState('')
  const [createGoodDeal, { loading: loadingGoodDealCreation, error }] =
    useMutation(CREATE_GOOD_DEAL)

  const schema = z.object({
    goodDealTitle: z
      .string()
      .min(3, { message: '3 caractères minimum' })
      .max(50, { message: '50 caractères max' }),
    goodDealContent: z
      .string()
      .min(3, { message: '3 caractères minimum' })
      .max(50, { message: '50 caractères max' }),
    goodDealLink: z.string().max(500, { message: '500 caractères max' }),
    image: z.string().max(500, { message: '500 caractères max' }),
  })

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      goodDealTitle: '',
      goodDealContent: '',
      goodDealLink: '',
      image: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    // console.log(">>>>data submitted >>>>", data);
    createGoodDeal({
      variables: {
        data: {
          goodDealTitle: data.goodDealTitle,
          goodDealContent: data.goodDealContent,
          goodDealLink: data.goodDealLink,
          image: fileCloudinaryUrl,
        },
      },
      onCompleted() {
        resetField('goodDealTitle')
        resetField('goodDealContent')
        resetField('goodDealLink')
        resetField('image')
        alert('Good deal published with success')
        //navigate to the new good deal details or to good deals list
      },
      onError(error) {
        console.log('>>>>ERROR GOOD DEAL CREATION FAILED >>>>', error.message)
        alert('Good deal creation failed')
      },
    })
  }

  if (loadingGoodDealCreation) {
    return (
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <h1>Error: good deal creation failed</h1>
  }

  return (
    <Box
      sx={{
        background: '#FFFFFF',
        width: '30%',
        // margin: "auto",
        margin: '10px auto 10px auto',
        padding: '0px 20px 0px 20px',
        // border: "2px solid red",
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
          fontSize: '40px',
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        {' '}
        Partages tes bons plans!
      </Typography>
      <Stack spacing={4}>
        <Controller
          name="goodDealTitle"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Titre" variant="outlined" />
          )}
        />
        {errors.goodDealTitle?.message && <p>{errors.goodDealTitle.message}</p>}

        <Controller
          name="goodDealContent"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Description" variant="outlined" />
          )}
        />
        {errors.goodDealContent?.message && (
          <p style={errorStyle}>{errors.goodDealContent.message}</p>
        )}

        <Controller
          name="goodDealLink"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Lien" variant="outlined" />
          )}
        />
        {errors.goodDealLink?.message && (
          <p style={errorStyle}>{errors.goodDealLink.message}</p>
        )}

        <input
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              console.log('>>>>>file uploaded>>>', event.target.files[0])
              uploadPictureToCloudinary(event.target.files[0]).then((url) =>
                setFileCloudinaryUrl(url)
              )
            }
          }}
        />
        {fileCloudinaryUrl !== '' && (
          <img
            style={{ width: '100px', height: '100px' }}
            alt="uploaded file"
            src={fileCloudinaryUrl}
          />
        )}

        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          fullWidth
          loading={loadingGoodDealCreation}
          variant="contained"
          sx={{ marginBottom: '20px' }}
          disabled={loadingGoodDealCreation}
        >
          Partager
        </LoadingButton>
      </Stack>
    </Box>
  )
}

export default GoodDealsForm
