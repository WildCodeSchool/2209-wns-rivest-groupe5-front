import { GET_MY_ACTIVITIES } from "../graphql/queries/activities/getMyActivitiesQuery";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ActivityList from "../components/ActivityList";

const MyActivitiesPage = () => {
  const [allActivities, setAllActivities] = useState();

  const [getMyActivities, { loading, error }] = useLazyQuery(
    GET_MY_ACTIVITIES,
    {
      fetchPolicy: "no-cache", // Used for first execution
    }
  );

  useEffect(() => {
    (async () => {
      const res = await getMyActivities();
      setAllActivities(res.data.getAllMyActivities);
    })();
  }, []);

  const updateActivityList = async () => {
    const res = await getMyActivities();
    setAllActivities(res.data.getAllMyActivities);
  };

  if (loading) {
    return <div>En cours de chargement...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>;
  }

  return (
    <ActivityList
      data={allActivities}
      forCurrentUser={true}
      updateActivityList={updateActivityList}
    />
  );
};

export default MyActivitiesPage;
