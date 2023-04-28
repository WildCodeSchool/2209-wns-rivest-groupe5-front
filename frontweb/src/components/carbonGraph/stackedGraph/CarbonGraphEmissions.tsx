import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { IChartDataState } from '../../../interfaces/graphs/IChartDataState'
import { stackedBarsChartOptions } from './stackedBarsChartOptions'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CarbonGraphEmissions = ({
  barChartData,
}: {
  barChartData: IChartDataState
}) => {
  if (barChartData.loading) return <div>Chargement...</div>

  if (barChartData.error)
    return <div>Une erreur est survenue :{barChartData.error.message}</div>

  if (!barChartData.data) return <div>Aucune donnée n'a pu être récupérée.</div>

  return (
    <Bar
      options={stackedBarsChartOptions}
      data={barChartData.data}
      redraw={true}
    />
  )
}

export default CarbonGraphEmissions
