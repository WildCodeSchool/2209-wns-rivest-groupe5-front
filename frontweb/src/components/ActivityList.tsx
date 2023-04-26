import { IActivity } from "../interfaces/IActivity";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { theme } from "../assets/Styles/theme";
import Activity from "./activities/Activity";

const ActivityList = ({
  data,
  forCurrentUser,
  updateActivityList,
}: {
  data: any;
  forCurrentUser: boolean;
  updateActivityList: () => Promise<void>;
}) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h2">Mes activités</Typography>
      {data && data.length === 0 ? (
        forCurrentUser === true ? (
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
          <p>Aucune activité enregistrée</p>
        )
      ) : (
        data.map((activity: IActivity) => {
          return (
            <Activity
              activity={activity}
              key={activity.activityId}
              updateActivityList={updateActivityList}
            />
          );
        })
      )}
    </Box>
  );
};

export default ActivityList;
