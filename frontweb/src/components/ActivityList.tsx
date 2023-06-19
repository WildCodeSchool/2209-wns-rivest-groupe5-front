import { IActivity } from '../interfaces/IActivity'
import { Box, Container, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { theme } from '../assets/Styles/theme'
import Activity from './activities/Activity'
import { Link } from 'react-router-dom'
import { IPaginatedResult } from '../interfaces/paginatedResult'

const ActivityList = ({
  data,
  forCurrentUser,
  updateActivityList,
  isAllList,
}: {
  data: IPaginatedResult<IActivity> | IActivity[]
  forCurrentUser: boolean
  updateActivityList: () => Promise<void>
  isAllList: boolean
}) => {
  if (!data) {
    return <div>Loading...</div>
  }

  const activitiesData = Array.isArray(data) ? data : data.data

  const displayActivities = activitiesData.map((activity: IActivity) => {
    return (
      <Activity
        activity={activity}
        key={activity.activityId}
        updateActivityList={updateActivityList}
      />
    )
  })

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2">
        {!forCurrentUser
          ? "Dernières activités de l'utilisateur"
          : isAllList
          ? 'Mes activités'
          : 'Mes dernières activités'}
      </Typography>
      {activitiesData && activitiesData.length === 0 ? (
        forCurrentUser === true ? (
          <Box>
            <p>Aucune activité enregistrée</p>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/create-activity" style={{ textDecoration: 'none' }}>
                <Button
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                  }}
                  sx={{ marginLeft: 'auto' }}
                >
                  Créer une activité
                </Button>
              </Link>
            </Box>
          </Box>
        ) : (
          <p>Aucune activité enregistrée</p>
        )
      ) : isAllList ? (
        displayActivities
      ) : (
        <>
          {displayActivities}{' '}
          {forCurrentUser && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/my-activities" style={{ textDecoration: 'none' }}>
                <Button
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                  }}
                  sx={{ marginLeft: 'auto' }}
                >
                  Voir toutes mes activités
                </Button>
              </Link>
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default ActivityList
