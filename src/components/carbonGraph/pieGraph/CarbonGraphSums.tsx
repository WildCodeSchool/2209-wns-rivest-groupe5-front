import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@apollo/client";
import { GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA } from "../../../graphql/queries/carbonGraphs/getTotalSumsActivitiesGraphData";
import { pieChartOptions } from "./pieChartOptions";
import styles from "./PieChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CarbonGraphSums = () => {
  const { data, loading, error } = useQuery(
    GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA
  );

  if (loading) return <div>Chargement...</div>;

  if (error) return <div>Une erreur est survenue :{error.message}</div>;

  return (
    <div>
      <h2 className={styles.title}>Total émissions</h2>
      <Doughnut
        options={pieChartOptions}
        data={data.getMyTotalCarbonPerActivityType}
      />
      <div className={styles.textWrapper}>
        <div className={styles.quantity}>
          {data.getMyTotalCarbonPerActivityType.datasets[0].data.reduce(
            (acc: number, curr: number) => acc + curr,
            0
          )}{" "}
          kg
        </div>
        <div>de CO2</div>
      </div>
    </div>
  );
};

export default CarbonGraphSums;
