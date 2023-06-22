import { useMutation, useQuery } from '@apollo/client'
import {
  Alert,
  Box,
  Collapse,
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { LoadingButton } from '@mui/lab'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, useParams } from 'react-router-dom'
import BasicModal from '../components/common/Modal'
import CircularProgress from '@mui/material/CircularProgress'
import GET_ACTIVITY_TYPE from '../graphql/queries/activities/getActivityTypes'
import { IactivityType } from '../interfaces/IActivityType'
import GET_ACTIVITY from '../graphql/queries/activities/getActivity'
import UPDATE_ACTIVITY from '../graphql/queries/activities/updateActivity'
import GoBackButton from '../components/GoBackButton'

type TUnit = 'gr' | 'kg'

const ActivityEdit = () => {
  const { activityId } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(1)
  const [carbonQtity, setCarbonQtity] = useState(0)
  const [carbonUnit, setCarbonUnit] = useState<TUnit>('kg')
  const [activityDate, setActivityDate] = useState<Dayjs | null>(null)
  const [openError, setOpenError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const { data, error, loading } = useQuery(GET_ACTIVITY, {
    variables: { activityId: parseInt(`${activityId}`) },
    fetchPolicy: 'no-cache',
  })

  // fetch activity types list
  const {
    loading: isLoadingActivityTypes,
    error: errorLoadingActivityTypes,
    data: activityTypes,
  } = useQuery(GET_ACTIVITY_TYPE)

  const [updateActivity, { loading: isLoadingUpdateActivity }] =
    useMutation(UPDATE_ACTIVITY)

  useEffect(() => {
    if (data?.getActivityById) {
      const { title, description, activityType, carbonQuantity, activityDate } =
        data.getActivityById

      setTitle(title ?? '')
      setDescription(description ?? '')
      setType(activityType?.activityTypeId ?? 1)
      setCarbonQtity(carbonQuantity ? carbonQuantity / 1000 : 0)
      setCarbonUnit('kg')
      setActivityDate(dayjs(activityDate))
    }
  }, [data])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Check if all required fields are provided
    if (title === '' || description === '' || activityDate === null) {
      setErrorMsg('Merci de fournir toutes les informations!')
      setOpenError(true)
      return
    }
    // Convert carbonQtity to "gr" if "kg" is selected
    const carbonQtityGramUnit =
      carbonUnit === 'kg' ? carbonQtity * 1000 : carbonQtity
    // Format date to be sent
    const formattedDate = activityDate?.toJSON()
    return updateActivity({
      variables: {
        data: {
          activityDate: formattedDate,
          activityTypeId: type,
          carbonQuantity: carbonQtityGramUnit,
          description: description,
          title,
        },
        activityId: parseInt(`${activityId}`),
      },
      onCompleted(data: any) {
        setOpenModal(true)
        // navigate('/my-activities')
      },
      onError(error: any) {
        setErrorMsg('La publication a échoué')
        setOpenError(true)
      },
    })
  }

  if (loading || isLoadingActivityTypes) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error || errorLoadingActivityTypes) {
    return (
      <div>
        ⚠️ Erreur lors de la récupération des informations de l'activité
      </div>
    )
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 2, width: '50%', margin: '0 auto' }}
    >
      <GoBackButton redirectUrl={`/my-activities`} />
      <Typography
        component="h1"
        variant="h5"
        sx={{ mt: 10, mb: 1, textAlign: 'center' }}
      >
        Mettre à jour l'activité
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
      <Stack direction={'column'} spacing={4}>
        <TextField
          required
          fullWidth
          id="title"
          label="Titre"
          name="title"
          inputProps={{ inputprops: { min: 3, max: 20 } }}
          onChange={(e) => {
            setOpenError(false)
            setTitle(e.target.value)
          }}
          value={title}
        />
        <TextField
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          inputProps={{ inputprops: { min: 3, max: 20 } }}
          onChange={(e) => {
            setOpenError(false)
            setDescription(e.target.value)
          }}
          value={description}
        />
        <FormControl fullWidth>
          <InputLabel>Type d'activité</InputLabel>
          <Select
            labelId="type"
            required
            id="type"
            value={type}
            label="Type d'activité"
            onChange={(e) => setType(Number(e.target.value))}
          >
            {activityTypes.getAllActivityTypes.map(
              ({ activityTypeId, label, emoji }: IactivityType) => (
                <MenuItem
                  value={activityTypeId}
                  selected={activityTypeId === type}
                >{`${emoji}  ${label}`}</MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <FormGroup
          sx={{
            border: '1px solid #bdbdbd',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <FormLabel component="legend">Emissions carbone</FormLabel>
          <RadioGroup
            defaultValue={carbonUnit}
            name="unit"
            row
            onChange={(e) => setCarbonUnit(e.target.value as TUnit)}
          >
            <FormControlLabel
              value="kg"
              control={<Radio />}
              label="Kilogramme"
            />
            <FormControlLabel value="gr" control={<Radio />} label="Gramme" />
          </RadioGroup>
          <TextField
            required
            type="number"
            id="carbonQtity"
            label="Quantité Carbone"
            name="carbonQtity"
            sx={{ width: '25%', mt: 2 }}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            onChange={(e) => {
              setCarbonQtity(Number(e.target.value))
            }}
            value={carbonQtity}
          />

          <a href="https://impactco2.fr/" target="_blank" rel="noreferrer">
            <Typography style={{ marginTop: 4 }} fontSize={12}>
              Besoin d'aide pour estimer ?
            </Typography>
          </a>
        </FormGroup>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Sélectionner une date"
            defaultValue={dayjs(new Date())}
            value={activityDate}
            onChange={(newValue: Dayjs | null) => {
              setActivityDate(newValue)
            }}
          />
        </LocalizationProvider>
      </Stack>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
        }}
      >
        <LoadingButton
          type="submit"
          fullWidth
          loading={isLoadingUpdateActivity}
          variant="contained"
          sx={{ width: '25%' }}
        >
          Mettre à jour
        </LoadingButton>
      </Box>
      <BasicModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        title=""
        text="Activité créée avec succès"
        buttonText="Voir mes activités"
        action={() => navigate('/my-activities')}
        iconType="success"
      />
    </Box>
  )
}

export default ActivityEdit
