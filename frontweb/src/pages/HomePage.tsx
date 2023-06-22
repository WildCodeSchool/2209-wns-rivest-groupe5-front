import { Box, Typography, Paper, Button } from '@mui/material'
import HomePageCard from '../components/HomePageCard'
import carbonFootprint from '../assets/carbon-footprint.jpg'
import carbonNeutral from '../assets/carbon-neutral.jpg'
import joinUs from '../assets/join-us.jpg'
import together from '../assets/user-network.png'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PhonelinkIcon from '@mui/icons-material/Phonelink'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import LoginIcon from '@mui/icons-material/Login'
import CardMedia from '@mui/material/CardMedia'
import CarouselContent from '../components/Carousel'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        paddingX: '20px',
      }}
    >
      <Box
        sx={{
          marginTop: '20px',
          width: '100%',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}
        >
          Du bilan carbone à la réduction <br />
          de vos émissions
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', marginTop: '20px' }}
        >
          Wildcarbon est l'outil qui vous accompagne au quotidien pour réduire
          votre empreinte carbone.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            marginTop: '100px',
            marginBottom: '100px',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <HomePageCard
            title="Réaliser un bilan carbone"
            content="Vous pouvez renseigner vos activités quotidiennes pour suivre vos émissions d'équivalent CO2 dans le temps"
            image={carbonFootprint}
          />
          <HomePageCard
            title="Partager vos bons plans éco"
            content="La communeauté partage régulièrement des bons plans pour réduire ses émissions de gaz à effet de serre"
            image={carbonNeutral}
          />
          <HomePageCard
            title="Inviter vos amis"
            content="Vous pouvez inviter vos amis à rejoindre la plateforme pour les inciter à réduire leur empreinte carbone et suivre leur évolution !"
            image={joinUs}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            marginBottom: '100px',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Box
            sx={{
              width: '600px',
              minHeight: '700px',
            }}
          >
            <Paper
              sx={{
                minHeight: '700px',
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center', mb: 3 }}>
                Qui sommes-nous ?
              </Typography>

              <Accordion sx={{ mb: 5 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="app-web-mobile"
                >
                  <Typography sx={{ fontWeight: '800', display: 'flex' }}>
                    Une application web et mobile
                    <PhonelinkIcon sx={{ ml: 2 }} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mb: 1 }}>
                    WildCarbon est une{' '}
                    <strong>application web et mobile innovante</strong>, conçue
                    pour faciliter la transition vers un mode de vie plus
                    durable et respectueux de l'environnement.
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    Son objectif principal est de permettre aux utilisateurs de{' '}
                    <strong>
                      partager et découvrir des bons plans éco-responsables
                    </strong>
                    , avec une faible consommation énergétique et une réduction
                    des émissions de carbone.
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    L'application WildCarbon propose également un outil de
                    calcul des dépenses carbones, qui aide les utilisateurs à{' '}
                    <strong>
                      évaluer l'impact de leurs actions quotidiennes
                    </strong>{' '}
                    sur l'environnement. Grâce à cet outil, vous pouvez prendre
                    des décisions éclairées et réduire votre empreinte carbone
                    de manière significative.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 5 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="app-web-mobile"
                >
                  <Typography sx={{ fontWeight: '800', display: 'flex' }}>
                    Un projet gratuit
                    <MoneyOffIcon sx={{ ml: 2 }} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mb: 1 }}>
                    WildCarbon est <strong>un projet gratuit</strong>,
                    accessible à tous ceux qui souhaitent s'engager en faveur de
                    l'écologie et du développement durable. Toutefois, si vous
                    trouvez l'application utile et souhaitez soutenir son
                    développement, il est possible de contribuer en{' '}
                    <strong>faisant un don</strong>.
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    Les fonds collectés permettront{' '}
                    <strong>de maintenir et d'améliorer l'application</strong>,
                    ainsi que de développer de nouvelles fonctionnalités pour
                    rendre la transition écologique encore plus simple et
                    accessible.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id="app-web-mobile"
                >
                  <Typography sx={{ fontWeight: '800', display: 'flex' }}>
                    Rejoignez nous
                    <LoginIcon sx={{ ml: 2 }} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mb: 1 }}>
                    Rejoignez dès maintenant la{' '}
                    <strong>communauté WildCarbon</strong> et participez
                    activement à la construction d'un avenir plus vert et
                    durable pour tous. Ensemble, nous pouvons faire la
                    différence et <strong>préserver notre planète</strong> pour
                    les générations futures.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <img src={together} alt="ensemble" />
            </Paper>
          </Box>

          <Box
            sx={{
              width: '450px',
            }}
          >
            <Paper
              sx={{
                minHeight: '700px',
                p: 5,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <a
                href="https://www.leetchi.com/fr/c/wildcarbon"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  flex: '1',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center', mb: 3 }}>
                    Cagnotte
                  </Typography>
                  <CardMedia
                    component="img"
                    src={require('../assets/money.jpg')}
                  />
                  <Typography sx={{ mt: 3 }}>
                    Afin de soutenir le développement de l'application, nous
                    avons mis en place une cagnotte en ligne. Si vous souhaitez
                    nous soutenir, vous pouvez faire un don en cliquant cette
                    cagnotte.
                  </Typography>

                  <Button variant="contained" color="secondary" sx={{ mt: 4 }}>
                    Participer
                  </Button>
                </div>
              </a>
            </Paper>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            marginBottom: '100px',
            justifyContent: 'center',
          }}
        >
          <Paper sx={{ width: '80%', minHeight: '300px', p: 5 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 3 }}>
              Nos derniers Bons Plans
            </Typography>
            <CarouselContent />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate('/good-deals-feed')
                }}
              >
                Voir tous les bons plans
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
