import ActivityList from "./ActivityList";
import { GET_MY_ACTIVITIES } from "../graphql/queries/activities/getMyActivitiesQuery";
import { useQuery } from "@apollo/client";

const MyActivitiesPage = () => {
    const { loading, error, data } = useQuery(GET_MY_ACTIVITIES, {
        fetchPolicy: "no-cache", // Used for first execution
    });

    if (loading) {
        return <div>Is loading...</div>;
    }

    if (error) {
        return <div>Une erreur est survenue</div>;
    }

    return (
        <ActivityList data={data?.getAllMyActivities} forCurrentUser={true} />
    );
};

export default MyActivitiesPage;
