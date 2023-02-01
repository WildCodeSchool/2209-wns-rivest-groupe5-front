import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { stackedBarsChartOptions } from "./stackedBarsChartOptions";
import { useQuery } from "@apollo/client";
import { GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA } from "../../graphql/queries/carbonGraphs/getMyLastWeekActivitiesGraphData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CarbonGraphEmissions = () => {
  const { data, loading, error } = useQuery(
    GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA
  );

  if (loading) return <div>Chargement...</div>;

  if (error) return <div>Une erreur est survenue :{error.message}</div>;

  return (
    <Bar
      options={stackedBarsChartOptions}
      data={data.getMyLastWeekActivities}
    />
  );
};

export default CarbonGraphEmissions;
