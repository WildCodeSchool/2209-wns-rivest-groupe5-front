import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "../../components/ListItems";
import CarbonGraphEmissions from "../../components/carbonGraph/stackedGraph/CarbonGraphEmissions";
import AccountMenu from "../../components/MenuAccount";
import CarbonGraphSums from "../../components/carbonGraph/pieGraph/CarbonGraphSums";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./Dashboard.module.css";
import { GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA } from "../../graphql/queries/carbonGraphs/getMyLastWeekActivitiesGraphData";
import { useLazyQuery } from "@apollo/client";
import { IChartDataState } from "../../interfaces/graphs/IChartDataState";
import { GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA } from "../../graphql/queries/carbonGraphs/getMyLastMonthActivitiesGraphData";
import { GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA } from "../../graphql/queries/carbonGraphs/getMyLastYearActivitiesGraphData";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  type barChartTimeUnitType = "week" | "month" | "year";

  const [getWeekBarChartData] = useLazyQuery(
    GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [getMonthBarChartData] = useLazyQuery(
    GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [getYearBarChartData] = useLazyQuery(
    GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [barChartTimeUnit, setBarChartTimeUnit] =
    useState<barChartTimeUnitType>("week");

  const [barChartData, setBarChartData] = useState<IChartDataState>({
    data: undefined,
    loading: true,
    error: undefined,
  });

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleTimeUnitBarChartChange = (event: SelectChangeEvent) => {
    setBarChartTimeUnit(event.target.value as barChartTimeUnitType);
  };

  useEffect(() => {
    (async () => {
      if (barChartTimeUnit === "month") {
        const res = await getMonthBarChartData();

        setBarChartData({
          data: res.data.getMyLastMonthActivities,
          loading: res.loading,
          error: res.error,
        });
      } else if (barChartTimeUnit === "year") {
        const res = await getYearBarChartData();

        setBarChartData({
          data: res.data.getMyLastYearActivities,
          loading: res.loading,
          error: res.error,
        });
      } else {
        const res = await getWeekBarChartData();

        setBarChartData({
          data: res.data.getMyLastWeekActivities,
          loading: res.loading,
          error: res.error,
        });
      }
    })();
  }, [
    barChartTimeUnit,
    getMonthBarChartData,
    getWeekBarChartData,
    getYearBarChartData,
  ]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <AccountMenu />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
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
                        <MenuItem value={"week"}>7 derniers jours</MenuItem>
                        <MenuItem value={"month"}>
                          4 dernières semaines
                        </MenuItem>
                        <MenuItem value={"year"}>12 derniers mois</MenuItem>
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
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CarbonGraphSums />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  3
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
