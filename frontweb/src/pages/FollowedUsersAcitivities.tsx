import { useQuery } from '@apollo/client'
import { IActivity } from '../interfaces/IActivity'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { GET_FOLLOWED_USERS_ACTIVITIES } from '../graphql/queries/activities/getFollowedUsersActivitiesQuery'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IPaginatedResult } from '../interfaces/paginatedResult'
import PaginationButtons from '../components/PaginationButtons'
import { theme } from '../assets/Styles/theme'

const FollowedUsersActivitiesList = () => {
  const [activities, setActivities] = useState<IPaginatedResult<IActivity>>({
    data: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })

  const { loading, error, fetchMore } = useQuery(
    GET_FOLLOWED_USERS_ACTIVITIES,
    {
      variables: { page: activities.currentPage },
      fetchPolicy: 'no-cache', // Used for first execution
    }
  )

  useEffect(() => {
    ;(async () => {
      const data = await fetchMore({
        variables: { page: activities.currentPage },
      })

      setActivities(data.data.getAllUsersFollowedLastSevenDaysActivities)
    })()
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>
  }

  const handleLoadNewResults = async (newPage: number) => {
    const results = await fetchMore({
      variables: { page: newPage },
    })

    setActivities(results.data.getAllUsersFollowedLastSevenDaysActivities)
  }

  return (
    <Container maxWidth={false}>
      <Typography variant="h2">
        Activités de ma communauté{' '}
        <span
          style={{
            fontSize: 14,
            color: theme.palette.grey[500],
          }}
        >
          (7 derniers jours)
        </span>
      </Typography>
      {activities.data.length === 0 ? (
        <Box>
          <p>Aucune activité enregistrée</p>
          <p>Veuillez suivre des utilisateurs pour voir leurs activités ici</p>
        </Box>
      ) : (
        <>
          <Typography>
            {activities?.total} résultat{activities?.total > 1 && 's'} - page{' '}
            {activities?.currentPage} / {activities?.totalPages}
          </Typography>
          {activities.data.map((activity: IActivity, index: number) => {
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
          })}
          <PaginationButtons
            items={activities}
            handleLoadNewResults={handleLoadNewResults}
          />
        </>
      )}
    </Container>
  )
}

export default FollowedUsersActivitiesList
