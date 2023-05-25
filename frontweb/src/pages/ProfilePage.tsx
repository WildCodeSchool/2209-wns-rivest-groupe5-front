import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { GET_USER_ACTIVITIES_STATS } from '../graphql/queries/activities/getUserActivitiesStatsQuery'
import { GET_USER_TOTAL_CARBON_STATS } from '../graphql/queries/activities/getUserTotalCarbonStatsQuery'
import styles from './dashboard/dashboard.module.css'
import CarbonGraphSums from '../components/carbonGraph/pieGraph/CarbonGraphSums'
import CarbonGraphEmissions from '../components/carbonGraph/stackedGraph/CarbonGraphEmissions'
import { GET_USER_ACTIVITIES } from '../graphql/queries/activities/getUserActivitiesQuery'
import { GET_USER_BY_ID } from '../graphql/queries/users/getUserByIdQuery'
import { GET_IS_USER_FOLLOWING } from '../graphql/queries/users/getIsUserFollowing'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../atom/currentUserAtom'
import { TOGGLE_FOLLOW_USER } from '../graphql/mutations/follows/toggleFollow'
import { Button } from '@mui/material'
import UserAvatar from '../components/users/UserAvatar'
import ActivityList from '../components/ActivityList'
import { IActivity } from '../interfaces/IActivity'

const ProfilePage = () => {
  const { userId } = useParams()
  const currentUser = useRecoilValue(currentUserState)
  const [userIsFollowing, setUserIsFollowing] = useState(false)
  const [allActivities, setAllActivities] = useState<IActivity[]>()

  const intUserId = userId ? parseInt(userId) : -1

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    fetchPolicy: 'no-cache', // Used for first execution
    variables: { userId: intUserId },
  })

  const [
    getIsUserFollowing,
    { loading: isFollowingLoading, error: isFollowingError },
  ] = useLazyQuery(GET_IS_USER_FOLLOWING, {
    fetchPolicy: 'no-cache',
    variables: {
      targetUserId: intUserId,
    },
  })

  const [toggleUserFollow, { loading: followLoading, error: followError }] =
    useMutation(TOGGLE_FOLLOW_USER, {
      variables: { userIdToFollow: intUserId },
    })

  useEffect(() => {
    ;(async () => {
      if (currentUser && Object.keys(currentUser).length > 0) {
        const res = await getIsUserFollowing()
        setUserIsFollowing(res?.data?.getIsUserIsFollowing)
      }
    })()
  }, [currentUser, getIsUserFollowing])

  const {
    loading: periodicLoading,
    error: periodicError,
    data: periodicData,
  } = useQuery(GET_USER_ACTIVITIES_STATS, {
    fetchPolicy: 'no-cache', // Used for first execution
    variables: { userIdToGetStats: intUserId },
  })

  const {
    loading: totalLoading,
    error: totalError,
    data: totalData,
  } = useQuery(GET_USER_TOTAL_CARBON_STATS, {
    fetchPolicy: 'no-cache', // Used for first execution
    variables: { userIdToGetStats: intUserId },
  })

  const [
    getUserActivities,
    {
      loading: activitiesLoading,
      error: activitiesError,
      data: activitiesData,
    },
  ] = useLazyQuery(GET_USER_ACTIVITIES, {
    fetchPolicy: 'no-cache', // Used for first execution
    variables: { userId: intUserId },
  })

  useEffect(() => {
    ;(async () => {
      const res = await getUserActivities()
      setAllActivities(res.data.getPublicOrFollowedUserLastSevenDaysActivities)
    })()
  }, [])

  const updateActivityList = async () => {
    const res = await getUserActivities()
    setAllActivities(res.data.getPublicOrFollowedUserLastSevenDaysActivities)
  }

  const handleToggleFollow = async () => {
    await toggleUserFollow()
    const res = await getIsUserFollowing()
    setUserIsFollowing(res?.data?.getIsUserIsFollowing)
  }

  if (
    loading ||
    followLoading ||
    periodicLoading ||
    totalLoading ||
    activitiesLoading ||
    isFollowingLoading
  ) {
    return <div>Is loading...</div>
  }

  if (
    error ||
    followError ||
    periodicError ||
    totalError ||
    activitiesError ||
    isFollowingError
  ) {
    const errors = [
      error,
      followError,
      periodicError,
      totalError,
      activitiesError,
      isFollowingError,
    ]

    const errorsMessages = errors.map((err) => err?.message)
    if (
      errorsMessages.some((msg) =>
        msg?.includes("Cannot access unfollowed private user's data")
      )
    ) {
      return (
        <div>
          Cet utilisateur est privé. Vous ne pourrez accéder à ses informations
          qu'en vous abonnant à son compte lorsqu'il aura passé son profil en
          public.
        </div>
      )
    }

    return <div>Une erreur inattendue est survenue... Veuillez réessayer.</div>
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <UserAvatar user={data.getUserById} />
          <p>
            {data?.getUserById?.firstname} {data?.getUserById?.lastname}
          </p>
          {currentUser && Object.keys(currentUser).length > 0 && (
            <Button
              onClick={handleToggleFollow}
              sx={{ marginLeft: 'auto' }}
              variant="contained"
            >
              {userIsFollowing ? 'Se désabonner' : "s'abonner"}
            </Button>
          )}
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div>
                <h2 className={styles.barChartTitle}>
                  Emissions CO<sub>2</sub>(kg)
                </h2>
              </div>
              <div className={styles.barchartGraph}>
                <CarbonGraphEmissions
                  barChartData={{
                    data: periodicData?.getPublicOrFollowedUserLastWeekActivities,
                    loading: periodicLoading,
                    error: periodicError,
                  }}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CarbonGraphSums
                data={
                  totalData?.getPublicOrFollowedUserTotalCarbonPerActivityType
                }
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ActivityList
                data={allActivities}
                forCurrentUser={false}
                updateActivityList={updateActivityList}
                isAllList={false}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default ProfilePage
