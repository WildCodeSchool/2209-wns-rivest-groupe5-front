import { Box, Typography } from "@mui/material";
import HomePageCard from "../components/HomePageCard";
import Header from "../components/Header";
import carbonFootprint from "../assets/carbon-footprint.jpg";
import carbonNeutral from "../assets/carbon-neutral.jpg";
import joinUs from "../assets/join-us.jpg";

const HomePage = () => {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingTop: "20px",
        paddingX: "20px",
      }}
    >
      <Header />
      <Box
        sx={{
          marginTop: "20px",
          width: "100%",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "center", marginTop: "20px" }}
        >
          Du bilan carbone à la réduction <br />
          de vos émissions
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Donec
          turpis massa, convallis ut sapien quis, eleifend dapibus ipsum
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "100px",
            marginBottom: "100px",
            justifyContent: "space-around",
          }}
        >
          <HomePageCard
            title="Réaliser un bilan carbone"
            content="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            image={carbonFootprint}
          />
          <HomePageCard
            title="Partager vos bons plans éco"
            content="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            image={carbonNeutral}
          />
          <HomePageCard
            title="Inviter vos amis"
            content="Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"
            image={joinUs}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
