import { useEffect, useState } from 'react'
import { IActivity } from '../interfaces/IActivity'
import { useLazyQuery } from '@apollo/client'
import { GET_MY_ACTIVITIES } from '../graphql/queries/activities/getMyActivitiesQuery'
import ActivityList from '../components/ActivityList'

const ActivityListPage = ({ isAllList }: { isAllList: boolean }) => {
  const [allActivities, setAllActivities] = useState<IActivity[]>()

  const [getMyActivities, { loading, error }] = useLazyQuery(
    GET_MY_ACTIVITIES,
    {
      fetchPolicy: 'no-cache', // Used for first execution
    }
  )

  useEffect(() => {
    ;(async () => {
      const res = await getMyActivities()
      setAllActivities(res.data.getAllMyActivities)
    })()
  }, [])

  const updateActivityList = async () => {
    const res = await getMyActivities()
    setAllActivities(res.data.getAllMyActivities)
  }

  if (loading) {
    return <div>En cours de chargement...</div>
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>
  }

  return (
    <ActivityList
      data={allActivities}
      forCurrentUser={true}
      updateActivityList={updateActivityList}
      isAllList={isAllList}
    />
  )
}

export default ActivityListPage
