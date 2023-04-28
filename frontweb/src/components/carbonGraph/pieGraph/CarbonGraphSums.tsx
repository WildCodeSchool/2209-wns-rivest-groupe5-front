import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { pieChartOptions } from './pieChartOptions'
import styles from './PieChart.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const CarbonGraphSums = ({ data }: { data: any }) => {
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className={styles.title}>Total émissions</h2>
      <Doughnut options={pieChartOptions} data={data} />
      <div className={styles.textWrapper}>
        <div className={styles.quantity}>
          {parseFloat(
            data.datasets[0].data
              .reduce((acc: number, curr: number) => acc + curr, 0)
              .toFixed(2)
          )}{' '}
          kg
        </div>
        <div>de CO2</div>
      </div>
    </div>
  )
}

export default CarbonGraphSums
