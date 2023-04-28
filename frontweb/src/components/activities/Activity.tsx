import { Box, Card, CardContent, Typography } from '@mui/material'
import BasicModal from '../common/Modal'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_ACTIVITY } from '../../graphql/mutations/activities/deleteActivityMutation'
import { IActivity } from '../../interfaces/IActivity'
import { format } from 'date-fns'
import { theme } from '../../assets/Styles/theme'

const Activity = ({
  activity,
  updateActivityList,
}: {
  activity: IActivity
  updateActivityList: () => Promise<void>
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [deleteActivity, { loading, error }] = useMutation(DELETE_ACTIVITY, {
    variables: { activityId: activity.activityId },
  })

  const handleDeleteActivity = async () => {
    await deleteActivity().catch((error) => console.log(error))
    await updateActivityList()
    setIsOpenModal(false)
  }

  if (loading) {
    return <div>En cours de chargement...</div>
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>
  }

  return (
    <Card
      style={{
        marginTop: 15,
        marginBottom: 15,
        boxShadow:
          '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        borderRadius: 10,
      }}
      key={activity.activityId}
    >
      <CardContent>
        <Typography gutterBottom variant="h3">
          {activity.title}
        </Typography>
        <p>
          <span
            style={{
              backgroundColor: activity.activityType.backgroundColor,
              padding: 5,
              borderRadius: 5,
            }}
          >
            {activity.activityType.label}
          </span>{' '}
          {activity.activityType.emoji}{' '}
          <span style={{ fontSize: 12 }}>
            {format(new Date(activity.activityDate), 'dd/MM/yyyy')}{' '}
          </span>
        </p>
        <p style={{ fontWeight: 'bolder' }}>
          {parseFloat((activity.carbonQuantity / 1000).toFixed(2))} kg de CO2
        </p>
        <p>{activity.description}</p>
        <Box
          onClick={() => setIsOpenModal(true)}
          color={theme.palette.error.main}
          fontSize={12}
          title="Supprimer l'activité"
          sx={{
            display: 'flex',
            justifyContent: 'end',
            cursor: 'pointer',
            alignItems: 'center',
          }}
        >
          Supprimer
          <DeleteIcon color="error" fontSize="medium" />
        </Box>
        <BasicModal
          openModal={isOpenModal}
          title="Etes-vous sûr de vouloir supprimer définitivement l'activité suivante ?"
          text={activity.title}
          iconType="error"
          handleClose={() => setIsOpenModal(false)}
          buttonText="Confirmer"
          action={handleDeleteActivity}
        ></BasicModal>
      </CardContent>
    </Card>
  )
}

export default Activity
