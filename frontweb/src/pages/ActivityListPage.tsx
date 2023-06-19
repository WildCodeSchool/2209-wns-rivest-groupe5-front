import { useEffect, useState } from 'react'
import { IActivity } from '../interfaces/IActivity'
import { useLazyQuery } from '@apollo/client'
import { GET_MY_ACTIVITIES } from '../graphql/queries/activities/getMyActivitiesQuery'
import ActivityList from '../components/ActivityList'
import { IPaginatedResult } from '../interfaces/paginatedResult'
import PaginationButtons from '../components/PaginationButtons'
import { Typography } from '@mui/material'

const ActivityListPage = ({ isAllList }: { isAllList: boolean }) => {
  const [allActivities, setAllActivities] = useState<
    IPaginatedResult<IActivity>
  >({
    data: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })

  const pageSize = isAllList ? 10 : 5

  const [getMyActivities, { loading, error }] = useLazyQuery(
    GET_MY_ACTIVITIES,
    {
      variables: { page: allActivities.currentPage, pageSize },
      fetchPolicy: 'no-cache', // Used for first execution
    }
  )

  useEffect(() => {
    ;(async () => {
      const res = await getMyActivities({
        variables: { page: allActivities.currentPage, pageSize },
      })
      setAllActivities(res.data.getAllMyActivities)
    })()
  }, [])

  const handleLoadNewResults = async (newPage: number) => {
    const results = await getMyActivities({
      variables: { page: newPage, pageSize },
    })

    setAllActivities(results.data.getAllMyActivities)
  }

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
    <>
      {isAllList ? (
        <Typography>
          {allActivities?.total} résultat{allActivities?.total > 1 && 's'} -
          page {allActivities?.currentPage} / {allActivities?.totalPages}
        </Typography>
      ) : (
        <Typography>Vos {pageSize} dernières activités</Typography>
      )}
      <ActivityList
        data={allActivities}
        forCurrentUser={true}
        updateActivityList={updateActivityList}
        isAllList={isAllList}
      />
      {isAllList && (
        <PaginationButtons
          items={allActivities}
          handleLoadNewResults={handleLoadNewResults}
        />
      )}
    </>
  )
}

export default ActivityListPage
