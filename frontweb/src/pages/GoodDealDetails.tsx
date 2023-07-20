import { Link, useParams } from 'react-router-dom'
import {
  Container,
  Box,
  Stack,
  Button,
  Snackbar,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material'
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
import DELETE_GOOD_DEAL from '../graphql/mutations/goodDeals/deleteGoodDeal'
import BasicModal from '../components/common/Modal'
import { formatFullname } from '../utils/formatName'
import GoBackButton from '../components/GoBackButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

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

  const goodDeal: IGoodDeal = data?.getGoodDeal
  const redirectUrl = `${
    goodDeal?.user.userId === currentUser?.userId
      ? '/my-good-deals'
      : '/good-deals-feed'
  }`

  const [toggleGoodDealVote, { loading: voteLoading, error: voteError }] =
    useMutation(TOGGLE_VOTE)

  if (error || voteError || errorGetVote) {
    return <div>Error</div>
  }

  if (loading) {
    return <CircularProgress />
  }

  if (voteLoading || loadingGetVote) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mb: 3,
            borderRadius: 3,
            p: 3,
          }}
        >
          <GoBackButton redirectUrl={redirectUrl} />
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
              Toutes les astuces
            </Typography>
            <Typography color="text.primary">Astuce {goodDealId}</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
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

  const src =
    goodDeal.image !== ''
      ? goodDeal.image
      : require('../assets/carbon-neutral.jpg')

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
        text="Etes-vous sûr(e) de vouloir supprimer cette astuce ? Elle ne pourra plus être récupérée."
        buttonText="Confirmer suppression"
        openModal={openDeleteGoodDealConfirmModal}
        handleClose={() => {
          setOpenDeleteGoodDealConfirmModal(false)
        }}
        action={async () => await handleDeleteMyGoodDeal()}
        iconType="error"
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
            ? "La suppression de l'astuce a échouée"
            : 'Votre astuce a été supprimée'}
        </Alert>
      </Snackbar>
      <Container maxWidth={false}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <GoBackButton redirectUrl={redirectUrl} />
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
              Toutes les astuces
            </Typography>
            <Typography color="text.primary">Good deal {goodDealId}</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          width="70%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginX: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '800px',
              maxHeight: '400px',
              objectFit: 'contain',
              marginX: 'auto',
            }}
          >
            <img
              src={src}
              alt="illustration de l'astuce"
              className="image-good-deal"
            />
          </Box>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
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
            <Box>
              <Typography
                variant="h1"
                sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}
              >
                {goodDeal.goodDealTitle}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <Avatar
                  alt="user"
                  src={avatar}
                  sx={{ mr: 1, width: 20, height: 20 }}
                />
                <Typography fontSize="12px">
                  <Link to={`/profile/${goodDeal.user.userId}`}>
                    <strong>
                      {formatFullname(
                        goodDeal.user.firstname,
                        goodDeal.user.lastname
                      )}
                    </strong>
                  </Link>
                </Typography>
                &nbsp;-&nbsp;
                <Typography
                  color="text.secondary"
                  fontSize="12px"
                  textAlign={'center'}
                >
                  Publié il y a{' '}
                  {diff > 0
                    ? diff > 1
                      ? diff + ' jours'
                      : diff + ' jour'
                    : diffHours > 1
                    ? diffHours + ' heures'
                    : diffHours + ' heure'}
                </Typography>
              </Box>
            </Box>
            {goodDeal.user.userId === currentUser?.userId && (
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                <Button
                  onClick={() => navigate(`/edit-good-deal/${goodDealId}`)}
                  title="Editer"
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    cursor: 'pointer',
                    alignItems: 'center',
                    color: 'black',
                    backgroundColor: 'white',
                    fontSize: 12,
                    border: '1px solid #ddd',
                  }}
                  endIcon={<EditIcon color="secondary" fontSize="medium" />}
                >
                  Editer
                </Button>
                <Button
                  onClick={() => setOpenDeleteGoodDealConfirmModal(true)}
                  title="Supprimer"
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    cursor: 'pointer',
                    alignItems: 'center',
                    color: 'black',
                    backgroundColor: 'white',
                    fontSize: 12,
                    border: '1px solid #ddd',
                  }}
                >
                  Supprimer
                  <DeleteIcon color="error" fontSize="medium" />
                </Button>
              </div>
            )}
          </Box>

          <Box
            sx={{
              background: 'white',
              minHeight: '200px',
              p: 3,
              borderRadius: 10,
            }}
          >
            <Box sx={{ py: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Description :
              </Typography>
              <Typography>
                {goodDeal.goodDealDescription ??
                  'Aucune description disponible.'}
              </Typography>
              {goodDeal.goodDealLink && goodDeal.goodDealLink !== '' && (
                <Typography sx={{ mt: 3 }}>
                  Lien utile proposé : {goodDeal.goodDealLink}
                </Typography>
              )}
            </Box>
            <Divider />
            <div
              dangerouslySetInnerHTML={{ __html: goodDeal.goodDealContent }}
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default GoodDealDetails
