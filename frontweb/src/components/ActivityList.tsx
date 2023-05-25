import { IActivity } from '../interfaces/IActivity'
import { Box, Container, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { theme } from '../assets/Styles/theme'
import Activity from './activities/Activity'
import { Link } from 'react-router-dom'

const ActivityList = ({
  data,
  forCurrentUser,
  updateActivityList,
  isAllList,
}: {
  data: any
  forCurrentUser: boolean
  updateActivityList: () => Promise<void>
  isAllList: boolean
}) => {
  if (!data) {
    return <div>Loading...</div>
  }

  if (!isAllList) {
    data = data.slice(0, 5)
  }

  const displayActivities = data.map((activity: IActivity) => {
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
        {isAllList ? 'Mes activités' : 'Mes dernières activités'}
      </Typography>
      {data && data.length === 0 ? (
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
        </>
      )}
    </Container>
  )
}

export default ActivityList
