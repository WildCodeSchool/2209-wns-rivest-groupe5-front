import { useQuery } from "@apollo/client";
import { GET_MY_ACTIVITIES } from "../graphql/queries/activities/getMyActivitiesQuery";
import { IActivity } from "../interfaces/IActivity";
import { Box, Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { theme } from "../assets/Styles/theme";

const ActivityList = () => {
  const { loading, error, data } = useQuery(GET_MY_ACTIVITIES, {
    fetchPolicy: "no-cache", // Used for first execution
  });

  if (loading) {
    return <div>Is loading...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>;
  }

  return (
    <Box>
      <h2>Mes activités</h2>
      {data.getAllMyActivities && data.getAllMyActivities.length === 0 ? (
        <Box>
          <p>Aucune activité enregistrée</p>
          <Button
            style={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            }}
            href="#contained-buttons"
          >
            Créer une activité
          </Button>
        </Box>
      ) : (
        data.getAllMyActivities.map((activity: IActivity, index: number) => {
          return (
            <Card
              style={{
                backgroundColor: "#e7e7e7",
                marginBottom: 25,
              }}
              key={index}
            >
              <CardContent>
                <h3>
                  {index + 1}. {activity.title}
                </h3>
                <p>
                  <span
                    style={{
                      backgroundColor: activity.activityType.backgroundColor,
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    {activity.activityType.label}
                  </span>{" "}
                  {activity.activityType.emoji}{" "}
                  <span style={{ fontSize: 12 }}>
                    {format(new Date(activity.activityDate), "dd/MM/yyyy")}{" "}
                  </span>
                </p>
                <p style={{ fontWeight: "bolder" }}>
                  {parseFloat((activity.carbonQuantity / 1000).toFixed(2))} kg
                  de CO2
                </p>
                <p>{activity.description}</p>
              </CardContent>
            </Card>
          );
        })
      )}
    </Box>
  );
};

export default ActivityList;
