import {useParams} from 'react-router-dom';
import {Container, Box, Stack} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {GET_GOOD_DEAL} from '../graphql/queries/goodDeals/getGoodDeal';
import {useQuery} from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
import {differenceInDays, differenceInHours} from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Avatar from '@mui/material/Avatar';

const GoodDealDetails = () => {
  const {goodDealId} = useParams();
  const navigate = useNavigate();

  const {data, error, loading} = useQuery(GET_GOOD_DEAL, {
    fetchPolicy: 'no-cache',
    variables: {
      id: parseInt(goodDealId!),
    },
  });

  if (error) {
    return <div>Error</div>;
  } else if (loading) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mb: 3,
            background: 'white',
            borderRadius: 3,
            p: 3,
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              navigate('/good-deals-feed');
            }}
          >
            <ArrowBackIcon sx={{mr: 2}} />
            Retour
          </Stack>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="text.secondary"
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                navigate('/good-deals-feed');
              }}
            >
              Feed good deals
            </Typography>
            <Typography color="text.primary">Good deal {goodDealId}</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            background: 'white',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'row',
            height: '400px',
          }}
        >
          <Skeleton
            variant="rounded"
            width="25%"
            height="100%"
            animation="wave"
          />
          <Box sx={{p: 3}} width="75%">
            <Skeleton animation="wave" variant="text" sx={{fontSize: '1rem'}} />
          </Box>
        </Box>
      </Container>
    );
  } else {
    const goodDeal = data.getGoodDeal;

    const src =
      goodDeal.image !== ''
        ? goodDeal.image
        : require('../assets/default-placeholder.png');

    const avatar =
      goodDeal.user.avatar !== ''
        ? goodDeal.user.avatar
        : require('../assets/default-user.png');

    const diff = differenceInDays(new Date(), new Date(goodDeal.createdAt));
    const diffHours = differenceInHours(
      new Date(),
      new Date(goodDeal.createdAt),
    );

    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mb: 3,
            background: 'white',
            borderRadius: 3,
            p: 3,
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              navigate('/good-deals-feed');
            }}
          >
            <ArrowBackIcon sx={{mr: 2}} />
            Retour
          </Stack>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="text.secondary"
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                navigate('/good-deals-feed');
              }}
            >
              Feed good deals
            </Typography>
            <Typography color="text.primary">Good deal {goodDealId}</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            background: 'white',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'row',
            height: '200px',
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            width="25%"
            height="100%"
          >
            <img src={src} alt="" className="image-good-deal"></img>
          </Box>
          <Box
            sx={{p: 3, display: 'flex', flexDirection: 'column'}}
            width="75%"
          >
            <Typography
              variant="h5"
              sx={{fontWeight: 700, textAlign: 'center', mb: 3}}
            >
              {goodDeal.goodDealTitle}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography color="text.secondary" fontSize="12px">
                Publié il y a{' '}
                {diff > 0
                  ? diff > 1 ? diff + ' jours' : diff + ' jour'
                  : diffHours > 1
                  ? diffHours + ' heures'
                  : diffHours + ' heure'}
              </Typography>
              <Box>
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    icon={<ThumbDownOffAltIcon />}
                    checkedIcon={<ThumbDownAltIcon />}
                  />
                  Nombre de like
                  <Checkbox
                    icon={<ThumbUpOffAltIcon />}
                    checkedIcon={<ThumbUpAltIcon />}
                  />
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar alt="user" src={avatar} sx={{mr: 2}} />
              Partagé par 
              <strong>
                {' '}
                {goodDeal.user.firstname} {goodDeal.user.lastname}
              </strong>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            background: 'white',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '200px',
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{mb: 2}}>
            A propos de ce deal :
          </Typography>
          <Typography>{goodDeal.goodDealContent}</Typography>
        </Box>
      </Container>
    );
  }
};

export default GoodDealDetails;
