import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styles from './dashboard.module.css'
import { GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA } from '../../graphql/queries/carbonGraphs/getMyLastWeekActivitiesGraphData'
import { useLazyQuery, useQuery } from '@apollo/client'
import { IChartDataState } from '../../interfaces/graphs/IChartDataState'
import { GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA } from '../../graphql/queries/carbonGraphs/getMyLastMonthActivitiesGraphData'
import { GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA } from '../../graphql/queries/carbonGraphs/getMyLastYearActivitiesGraphData'
import CarbonGraphEmissions from '../../components/carbonGraph/stackedGraph/CarbonGraphEmissions'
import CarbonGraphSums from '../../components/carbonGraph/pieGraph/CarbonGraphSums'
import { GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA } from '../../graphql/queries/carbonGraphs/getTotalSumsActivitiesGraphData'
import ActivityListPage from '../ActivityListPage'
import { theme } from '../../assets/Styles/theme'
import { CircularProgress } from '@mui/material'

const Dashboard = () => {
  type barChartTimeUnitType = 'week' | 'month' | 'year'

  const [getWeekBarChartData] = useLazyQuery(
    GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const [getMonthBarChartData] = useLazyQuery(
    GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const [getYearBarChartData] = useLazyQuery(
    GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const {
    data: sumData,
    loading: sumLoading,
    error: sumError,
  } = useQuery(GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA)

  const [barChartTimeUnit, setBarChartTimeUnit] =
    useState<barChartTimeUnitType>('week')

  const [barChartData, setBarChartData] = useState<IChartDataState>({
    data: undefined,
    loading: true,
    error: undefined,
  })

  const handleTimeUnitBarChartChange = (event: SelectChangeEvent) => {
    setBarChartTimeUnit(event.target.value as barChartTimeUnitType)
  }

  useEffect(() => {
    ;(async () => {
      if (barChartTimeUnit === 'month') {
        const res = await getMonthBarChartData()

        setBarChartData({
          data: res.data.getMyLastMonthActivities,
          loading: res.loading,
          error: res.error,
        })
      } else if (barChartTimeUnit === 'year') {
        const res = await getYearBarChartData()

        setBarChartData({
          data: res.data.getMyLastYearActivities,
          loading: res.loading,
          error: res.error,
        })
      } else {
        const res = await getWeekBarChartData()

        setBarChartData({
          data: res.data.getMyLastWeekActivities,
          loading: res.loading,
          error: res.error,
        })
      }
    })()
  }, [
    barChartTimeUnit,
    getMonthBarChartData,
    getWeekBarChartData,
    getYearBarChartData,
  ])

  if (sumLoading) {
    return <CircularProgress />
  }

  if (sumError) {
    return <div>Une erreur est survenue</div>
  }

  return (
    <Grid
      container
      spacing={3}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <div className={styles.barchartSelect}>
            <h2 className={styles.barChartTitle}>Vos émissions (kg)</h2>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">
                Données à afficher
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={barChartTimeUnit}
                label="Données à afficher"
                onChange={handleTimeUnitBarChartChange}
              >
                <MenuItem value={'week'}>7 derniers jours</MenuItem>
                <MenuItem value={'month'}>4 dernières semaines</MenuItem>
                <MenuItem value={'year'}>12 derniers mois</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.barchartGraph}>
            <CarbonGraphEmissions barChartData={barChartData} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <CarbonGraphSums data={sumData?.getMyTotalCarbonPerActivityType} />
        </Paper>
      </Grid>
      <ActivityListPage isAllList={false} />
    </Grid>
  )
}

export default Dashboard
