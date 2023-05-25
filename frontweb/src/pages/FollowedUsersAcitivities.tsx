import { useQuery } from '@apollo/client'
import { IActivity } from '../interfaces/IActivity'
import { Box, Card, CardContent, Container } from '@mui/material'
import { format } from 'date-fns'
import { GET_FOLLOWED_USERS_ACTIVITIES } from '../graphql/queries/activities/getFollowedUsersActivitiesQuery'
import { Link } from 'react-router-dom'

const FollowedUsersActivitiesList = () => {
  const { loading, error, data } = useQuery(GET_FOLLOWED_USERS_ACTIVITIES, {
    fetchPolicy: 'no-cache', // Used for first execution
  })

  if (loading) {
    return <div>Is loading...</div>
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <h2>Activités de ma communauté</h2>
      {data.getAllUsersFollowedLastSevenDaysActivities &&
      data.getAllUsersFollowedLastSevenDaysActivities.length === 0 ? (
        <Box>
          <p>Aucune activité enregistrée</p>
          <p>Veuillez suivre des utilisateurs pour voir leurs activités ici</p>
        </Box>
      ) : (
        data.getAllUsersFollowedLastSevenDaysActivities.map(
          (activity: IActivity, index: number) => {
            return (
              <Card
                style={{
                  backgroundColor: '#e7e7e7',
                  marginBottom: 25,
                }}
                key={index}
              >
                <CardContent>
                  <h3>{activity.title}</h3>
                  <Link to={`/profile/${activity.user?.userId}`}>
                    {activity.user?.firstname} {activity.user?.lastname}
                  </Link>
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
                    {parseFloat((activity.carbonQuantity / 1000).toFixed(2))} kg
                    de CO2
                  </p>
                </CardContent>
              </Card>
            )
          }
        )
      )}
    </Container>
  )
}

export default FollowedUsersActivitiesList
