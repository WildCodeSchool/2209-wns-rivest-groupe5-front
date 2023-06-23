import { Box, Typography, Button, Fab, Slide } from '@mui/material'
import HomePageCard from '../components/HomePageCard'
import carbonFootprint from '../assets/carbon-footprint.jpg'
import carbonNeutral from '../assets/carbon-neutral.jpg'
import joinUs from '../assets/join-us.jpg'
import CarouselContent from '../components/Carousel'
import { useNavigate } from 'react-router-dom'
import background from '../assets/homepage_background.jpg'
import background_services from '../assets/background-services.png'
import background_aboutus from '../assets/background-aboutus.png'
import background_soutenir from '../assets/background-soutenir.png'
import background_gooddeals from '../assets/background-gooddeals.png'
import webapp from '../assets/webapp.svg'
import aboutus1 from '../assets/aboutus1.svg'
import aboutus2 from '../assets/aboutus2.svg'
import aboutus3 from '../assets/aboutus3.svg'
import soutenir from '../assets/soutenir.svg'
import {theme} from '../assets/Styles/theme'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useRef, useState, useEffect } from 'react'

const HomePage = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    if (headerRef.current !== null) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  
  return (
    <>
      {/* Header */}
      <Box sx={{
        background: `url(${background})`,
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 15,
        marginBottom: 10
      }} ref={headerRef}>
        <Box>
          <Typography style={{textTransform: 'uppercase', fontSize: 14, color: theme.palette.primary.main, fontWeight: 600 }}>Dépense carbone</Typography>
          <Typography style={{fontSize: 68, fontWeight: 600, marginTop: '40px', width: '70%', lineHeight: '87px' }}>Du bilan carbone à la réduction <br />
          de vos émissions</Typography>
          <Typography style={{ fontSize: 18, color: theme.palette.secondary.main, marginTop: '40px' }}>Wildcarbon est l'outil qui vous accompagne au quotidien pour réduire
          votre empreinte carbone.</Typography>
        </Box>
      </Box>

      {/* About us */}
      <Box sx={{
          backgroundImage: `url(${background_aboutus})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
      }}>
        <Box sx={{
          backgroundImage: `url(${webapp})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          minWidth: '500px',
          height: '100%',
          marginTop: '130px',
        }}>

        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: '50%'}}>
          <Typography style={{textTransform: 'uppercase', fontSize: 16, color: theme.palette.primary.main, fontWeight: 600 }}>Qui sommes-nous ?</Typography>
          <Typography style={{fontSize: 35, fontWeight: 600, marginTop: '10px', lineHeight: '87px' }}>Un acteur de la transition écologique</Typography>

          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Box sx={{backgroundImage: `url(${aboutus1})`, height: '50px', minWidth: '100px', backgroundRepeat: 'no-repeat'}}></Box>
            <Box>
              <Typography style={{textTransform: 'uppercase', fontSize: 16, color: theme.palette.primary.main, fontWeight: 600 }}>Une application web et mobile</Typography>
              <Typography>WildCarbon est une{' '}
                    <strong>application web et mobile innovante</strong>, conçue
                    pour faciliter la transition vers un mode de vie plus
                    durable et respectueux de l'environnement.
              </Typography>
            </Box>
          </Box>

          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
            <Box sx={{backgroundImage: `url(${aboutus2})`, height: '50px', minWidth: '100px', backgroundRepeat: 'no-repeat'}}></Box>
            <Box>
              <Typography style={{textTransform: 'uppercase', fontSize: 16, color: theme.palette.primary.main, fontWeight: 600 }}>Un projet gratuit</Typography>
              <Typography>
                WildCarbon est <strong>un projet gratuit</strong>,
                accessible à tous ceux qui souhaitent s'engager en faveur de
                l'écologie et du développement durable. Toutefois, si vous
                trouvez l'application utile et souhaitez soutenir son
                développement, il est possible de contribuer en{' '}
                <strong>faisant un don</strong>.
              </Typography>
            </Box>
          </Box>

          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
            <Box sx={{backgroundImage: `url(${aboutus3})`, height: '50px', minWidth: '100px', backgroundRepeat: 'no-repeat'}}></Box>
            <Box>
              <Typography style={{textTransform: 'uppercase', fontSize: 16, color: theme.palette.primary.main, fontWeight: 600 }}>Rejoignez nous</Typography>
              <Typography>
                Rejoignez dès maintenant la{' '}
                <strong>communauté WildCarbon</strong> et participez
                activement à la construction d'un avenir plus vert et
                durable pour tous. Ensemble, nous pouvons faire la
                différence et <strong>préserver notre planète</strong> pour
                les générations futures.
              </Typography>
            </Box>
          </Box>

        </Box>

      </Box>

      {/* Services */}
      <Box sx={{
          backgroundImage: `url(${background_services})`,
          backgroundRepeat: 'no-repeat',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
      }}>
          <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography style={{textTransform: 'uppercase', fontSize: 16, color: theme.palette.primary.main, fontWeight: 600 }}>Nos services</Typography>
            <Typography style={{fontSize: 35, fontWeight: 600, marginTop: '10px', lineHeight: '87px' }}>Vous accompagner dans une transition écologique</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              marginTop: '30px',
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
      </Box>

        {/* Soutenir */}
      <Box sx={{
          backgroundImage: `url(${background_soutenir})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 5
      }}>
        
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: '50%'}}>
          <Typography style={{textTransform: 'uppercase', fontSize: 16, color: theme.palette.primary.main, fontWeight: 600 }}>Nous soutenir</Typography>
          <Typography style={{fontSize: 35, fontWeight: 600, marginTop: '10px', lineHeight: '87px' }}>Nous avons besoin de vous</Typography>
          <Box sx={{
          backgroundImage: `url(${soutenir})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          minWidth: '250px',
          height: '200px',
          marginTop: '30px',
          }}>

          </Box>

          <Typography sx={{ mt: 1, paddingLeft: '30px', width: '50%' }}>
            Afin de soutenir le développement de l'application, nous
            avons mis en place une cagnotte en ligne. Si vous souhaitez
            nous soutenir, vous pouvez <a href="https://www.leetchi.com/fr/c/wildcarbon" target='_blank' rel='noreferrer'>faire un don</a>
          </Typography>
        </Box>

        <Box sx={{
          minWidth: '500px',
          height: '100%',
          marginTop: '130px',
        }}>

        </Box>

      </Box>
      
      {/* Bons plans */}
      <Box sx={{
          backgroundImage: `url(${background_gooddeals})`,
          backgroundRepeat: 'no-repeat',
          minHeight: '630px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 10,
          marginBottom: 2
      }}>
          <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '30px'}}>
            <Typography style={{textTransform: 'uppercase', fontSize: 16, color: theme.palette.primary.main, fontWeight: 600 }}>Nos derniers bons plans</Typography>
            <Typography style={{fontSize: 35, fontWeight: 600, marginTop: '10px', lineHeight: '87px' }}>Partagez vous aussi vos astuces bas carbone !</Typography>
          </Box>
          <Box sx={{ width: '80%', minHeight: '300px', p: 5 }}>
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
          </Box>
      </Box>
      
      <Slide direction="up" in={isVisible} mountOnEnter unmountOnExit>
        <Fab size="medium" color="secondary" aria-label="gotop" sx={{position: 'fixed', bottom: 15, right: 15}} onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </Fab>
      </Slide>
        

    </>
  )
}

export default HomePage
