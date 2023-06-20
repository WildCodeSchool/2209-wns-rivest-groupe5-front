import { useParams } from 'react-router-dom'
import { Container, Box, Stack, Button, Snackbar, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { GET_GOOD_DEAL } from '../graphql/queries/goodDeals/getGoodDeal'
import { useMutation, useQuery } from '@apollo/client'
import Skeleton from '@mui/material/Skeleton'
import { differenceInDays, differenceInHours } from 'date-fns'
import Checkbox from '@mui/material/Checkbox'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { TOGGLE_VOTE } from '../graphql/mutations/goodDealVote/toggleVote'
import { GET_GOOD_DEAL_VOTE_BY_USER } from '../graphql/queries/goodDealVote/getGoodDealVoteByUser'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../atom/currentUserAtom'
import { IGoodDeal } from '../interfaces/goodDeals/IGoodDeal'
import { theme } from '../assets/Styles/theme'
import DELETE_GOOD_DEAL from '../graphql/mutations/goodDeals/deleteGoodDeal'
import BasicModal from '../components/common/Modal'

const GoodDealDetails = () => {
  const currentUser = useRecoilValue(currentUserState)
  const { goodDealId } = useParams()
  const navigate = useNavigate()
  const [disliked, setDisliked] = useState(false)
  const [liked, setLiked] = useState(false)
  const [openDeleteGoodDealConfirmModal, setOpenDeleteGoodDealConfirmModal] =
    useState<boolean>(false)
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
  const { data, error, loading, refetch } = useQuery(GET_GOOD_DEAL, {
    fetchPolicy: 'no-cache',
    variables: {
      id: parseInt(goodDealId!),
    },
  })

  const [deleteMyGoodDeal, { error: deleteError }] = useMutation(
    DELETE_GOOD_DEAL,
    {
      variables: { goodDealId: parseInt(goodDealId!) },
    }
  )

  const {
    data: dataGetVote,
    error: errorGetVote,
    loading: loadingGetVote,
  } = useQuery(GET_GOOD_DEAL_VOTE_BY_USER, {
    fetchPolicy: 'no-cache',
    variables: {
      id: parseInt(goodDealId!),
    },
  })

  const vote = dataGetVote?.getGoodDealVoteByUser
  useEffect(() => {
    if (vote && vote.length !== 0) {
      if (vote[0].value === 1) {
        setLiked(true)
      } else {
        setDisliked(true)
      }
    }
  }, [dataGetVote, vote])

  const [toggleGoodDealVote, { loading: voteLoading, error: voteError }] =
    useMutation(TOGGLE_VOTE)

  if (error || voteError || errorGetVote) {
    return <div>Error</div>
  }

  if (loading || voteLoading || loadingGetVote) {
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
              navigate(redirectUrl)
            }}
          >
            <ArrowBackIcon sx={{ mr: 2 }} />
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
                navigate(redirectUrl)
              }}
            >
              Tous les bons plans
            </Typography>
            <Typography color="text.primary">Bon plan {goodDealId}</Typography>
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
          <Box sx={{ p: 3 }} width="75%">
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: '1rem' }}
            />
          </Box>
        </Box>
      </Container>
    )
  }

  const goodDeal: IGoodDeal = data.getGoodDeal

  const src =
    goodDeal.image !== ''
      ? goodDeal.image
      : require('../assets/default-placeholder.png')

  const avatar =
    goodDeal.user.avatar !== ''
      ? goodDeal.user.avatar
      : require('../assets/default-user.png')

  const diff = differenceInDays(new Date(), new Date(goodDeal.createdAt))
  const diffHours = differenceInHours(new Date(), new Date(goodDeal.createdAt))

  const handleDislike = async () => {
    setDisliked(true)
    setLiked(false)
    await toggleGoodDealVote({
      variables: {
        goodDealId: parseInt(goodDealId!),
        value: -1,
      },
    }).then(() => {
      refetch()
    })
  }

  const handleLike = async () => {
    setDisliked(false)
    setLiked(true)
    await toggleGoodDealVote({
      variables: {
        goodDealId: parseInt(goodDealId!),
        value: 1,
      },
    }).then(() => {
      refetch()
    })
  }

  const redirectUrl = `${
    goodDeal.user.userId === currentUser?.userId
      ? '/my-good-deals'
      : '/good-deals-feed'
  }`

  const handleDeleteMyGoodDeal = async () => {
    await deleteMyGoodDeal({
      onCompleted(data) {
        navigate(redirectUrl)
      },
      onError(error) {
        setIsSnackBarOpen(true)
        console.log(error)
      },
    })
  }

  function handleCloseSnackBar(event: React.SyntheticEvent | Event) {
    setIsSnackBarOpen(false)
  }

  return (
    <>
      <BasicModal
        text="Etes-vous sûr(e) de vouloir supprimer ce bon plan ? Il ne pourra plus être récupéré."
        buttonText="Confirmer suppression"
        openModal={openDeleteGoodDealConfirmModal}
        handleClose={() => {
          setOpenDeleteGoodDealConfirmModal(false)
        }}
        action={async () => await handleDeleteMyGoodDeal()}
        iconType="info"
      />
      <Snackbar
        open={isSnackBarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          sx={{ width: '500px' }}
          severity={deleteError ? 'error' : 'success'}
        >
          {deleteError
            ? 'La suppression du bon plan a échouée'
            : 'Votre bon plan a été supprimé'}
        </Alert>
      </Snackbar>
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
              console.log('goodDeal.user.userId', goodDeal.user.userId)
              console.log('currentUser?.userId', currentUser?.userId)
              navigate(redirectUrl)
            }}
          >
            <ArrowBackIcon sx={{ mr: 2 }} />
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
                navigate(redirectUrl)
              }}
            >
              Tous les bons plans
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
            sx={{ p: 3, display: 'flex', flexDirection: 'column' }}
            width="75%"
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}
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
                  ? diff > 1
                    ? diff + ' jours'
                    : diff + ' jour'
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
                    color="error"
                    onClick={handleDislike}
                    checked={disliked}
                  />
                  {goodDeal.total}
                  <Checkbox
                    icon={<ThumbUpOffAltIcon />}
                    checkedIcon={<ThumbUpAltIcon />}
                    onClick={handleLike}
                    checked={liked}
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
              <Avatar alt="user" src={avatar} sx={{ mr: 2 }} />
              Partagé par&nbsp;
              <strong>
                {goodDeal.user.firstname} {goodDeal.user.lastname}
              </strong>
            </Box>
          </Box>
        </Box>

        {goodDeal.user.userId === currentUser?.userId && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              size="small"
              style={{
                backgroundColor: theme.palette.warning.main,
                color: '#fff',
                width: 'max-content',
                margin: '20px auto',
              }}
              onClick={() => setOpenDeleteGoodDealConfirmModal(true)}
            >
              Supprimer ce bon plan
            </Button>
          </Box>
        )}

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
          <Typography variant="h6" sx={{ mb: 2 }}>
            Description :
          </Typography>
          <Typography sx={{ mb: 6 }}>
            {goodDeal.goodDealDescription ?? 'Aucune description disponible.'}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Le bon plan :
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: goodDeal.goodDealContent }} />
        </Box>
      </Container>
    </>
  )
}

export default GoodDealDetails
