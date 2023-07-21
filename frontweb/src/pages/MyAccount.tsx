import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material'
import { currentUserState } from '../atom/currentUserAtom'
import { useRecoilState } from 'recoil'
import { useLazyQuery, useMutation } from '@apollo/client'
import { TOGGLE_USER_VISIBILITY } from '../graphql/mutations/users/toggleUserVisibilityMutation'
import { GET_MY_USER_DATA } from '../graphql/queries/users/getMyUserData'
import { UPDATE_MY_INFOS } from '../graphql/mutations/users/updateMyUserInformationsMutation'
import { useState } from 'react'
import { theme } from '../assets/Styles/theme'
import BasicModal from '../components/common/Modal'
import Divider from '@mui/material/Divider'
import { DELETE_MY_ACCOUNT } from '../graphql/mutations/users/deleteMyAccount'
import { useNavigate } from 'react-router-dom'
import { INVITE_FRIEND } from '../graphql/mutations/users/inviteFriend'

const MyAccount = () => {
  const [user, setUser] = useRecoilState(currentUserState)
  const [newFirstname, setNewFirstname] = useState(user?.firstname)
  const [newLastname, setNewLastname] = useState(user?.lastname)
  const [emailToInvite, setEmailToInvite] = useState('')
  const [openDeleteAccountConfirmModal, setOpenDeleteAccountConfirmModal] =
    useState<boolean>(false)
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
  const [isSnackBarUpdateOpen, setIsSnackBarUpdateOpen] = useState(false)
  const [isSnackBarInvitationOpen, setIsSnackBarInvitationOpen] =
    useState(false)

  const navigate = useNavigate()

  const [toggleUserVisibility, { error: visibilityError }] = useMutation(
    TOGGLE_USER_VISIBILITY
  )

  const [updateUserInfos, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_MY_INFOS, {
      fetchPolicy: 'no-cache',
      variables: {
        lastname: newLastname,
        firstname: newFirstname,
      },
    })

  const [getMyUserData] = useLazyQuery(GET_MY_USER_DATA, {
    fetchPolicy: 'no-cache',
  })

  const [deleteMyAccount, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_MY_ACCOUNT)

  const [inviteFriend, { loading: inviteLoading, error: inviteError }] =
    useMutation(INVITE_FRIEND)

  const handleTogglePublicProfile = async () => {
    await toggleUserVisibility()
    await getMyUserData({
      fetchPolicy: 'no-cache',
      onCompleted(data) {
        localStorage.setItem('user', JSON.stringify(data.getMyUserData))
        setUser(data.getMyUserData)
        setIsSnackBarUpdateOpen(true)
      },
      onError(error) {
        setIsSnackBarUpdateOpen(true)
        console.log(error)
      },
    })
  }

  const handleDeleteMyAccount = async () => {
    await deleteMyAccount({
      onCompleted(data) {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/')
      },
      onError(error) {
        setIsSnackBarOpen(true)
        console.log(error)
      },
    })
  }

  const handleInviteFriend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await inviteFriend({
      variables: {
        email: emailToInvite,
      },
      onCompleted(data) {
        setIsSnackBarInvitationOpen(true)
      },
      onError(error) {
        setIsSnackBarInvitationOpen(true)
        console.log(error)
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserInfos({
      onCompleted(data) {
        setUser(data.updateMyUserInformations)
        setIsSnackBarUpdateOpen(true)
      },
      onError() {
        setIsSnackBarUpdateOpen(true)
      },
    })
  }

  function handleCloseSnackBar(event: React.SyntheticEvent | Event) {
    setIsSnackBarOpen(false)
  }

  return (
    <>
      <BasicModal
        text="Etes-vous sûr(e) de vouloir supprimer votre compte ? Toutes vos données liées seront également supprimées."
        buttonText="Supprimer définitivement"
        openModal={openDeleteAccountConfirmModal}
        handleClose={() => {
          setOpenDeleteAccountConfirmModal(false)
        }}
        action={async () => await handleDeleteMyAccount()}
        iconType="error"
      />
      <Snackbar
        open={isSnackBarUpdateOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          sx={{ width: '500px' }}
          severity={updateError || visibilityError ? 'error' : 'success'}
        >
          {updateError || visibilityError
            ? 'Erreur durant la mise à jour de vos informations'
            : 'Vos informations ont été mises à jour avec succès'}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSnackBarInvitationOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          sx={{ width: '500px' }}
          severity={inviteError ? 'error' : 'success'}
        >
          {inviteError
            ? "L'envoi d'invitation a échouée"
            : "L'invitation a été envoyée avec succès"}
        </Alert>
      </Snackbar>
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
            ? 'La suppression du compte a échouée'
            : 'Votre compte a été supprimé'}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          mb: 4,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Mes infos personnelles
        </Typography>
        <Typography variant="body1" gutterBottom>
          Votre profil est actuellement{' '}
          {user?.visibility === 'public' ? 'public' : 'privé'}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              onChange={handleTogglePublicProfile}
              checked={user?.visibility === 'public'}
            />
          }
          label="Autoriser profil public"
        />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            label="Prénom"
            value={newFirstname}
            onChange={(e) => setNewFirstname(e.target.value)}
            sx={{ mb: 4 }}
            inputProps={{ minLength: 1 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Nom"
            value={newLastname}
            onChange={(e) => setNewLastname(e.target.value)}
            sx={{ mb: 4 }}
            inputProps={{ minLength: 1 }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            defaultValue={user?.email}
            sx={{ mb: 1 }}
            InputProps={{
              readOnly: true,
            }}
          />
          <Typography variant="body1" sx={{ fontSize: 12 }}>
            Vous ne pouvez pas mettre à jour votre adresse email. En cas de
            problème, veuillez contacter l'équipe technique à
          </Typography>
          <a
            href="mailto:wildcarbon.contact@gmail.com"
            style={{ fontSize: 12 }}
          >
            wildcarbon.contact@gmail.com
          </a>
          <div>
            <Button
              type="submit"
              sx={{ mt: 4 }}
              style={{
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              }}
            >
              {updateLoading ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </div>
        </form>
      </Box>
      <Divider />
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          mb: 4,
          mt: 4,
        }}
      >
        <Typography variant="h3">Inviter un ami</Typography>
        <Typography>
          Vous trouvez cette application géniale ? Envoyer une invitation à nous
          rejoindre à vos amis ! Vous pouvez rentrer ici l'adresse email de la
          personne que vous souhaitez inviter.
        </Typography>

        <form onSubmit={handleInviteFriend}>
          <TextField
            fullWidth
            margin="dense"
            label="Email de la personne à inviter"
            value={emailToInvite}
            onChange={(e) => setEmailToInvite(e.target.value)}
            sx={{ mb: 4 }}
            inputProps={{ minLength: 1 }}
            type="email"
            required
          />
          <div>
            <Button
              type="submit"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              }}
            >
              {inviteLoading ? 'Envoi en cours...' : 'Envoyer invitation'}
            </Button>
          </div>
        </form>
      </Box>
      <Divider />
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          mb: 4,
          mt: 4,
        }}
      >
        <Typography variant="h3" color={theme.palette.error.main}>
          Suppression du compte
        </Typography>
        <Typography>
          Vous souhaitez supprimer votre compte ? Toutes les données liées à
          votre compte seront également supprimées.
        </Typography>
        <ul>
          <li>Vos données d'utilisateur</li>
          <li>Vos activités</li>
          <li>Vos astuces et vos votes</li>
          <li>Vos abonnements</li>
        </ul>

        <Button
          style={{
            backgroundColor: theme.palette.error.main,
            color: '#fff',
          }}
          size="small"
          onClick={() => setOpenDeleteAccountConfirmModal(true)}
        >
          {deleteLoading ? 'Suppression...' : 'Supprimer le compte'}
        </Button>
      </Box>
    </>
  )
}

export default MyAccount
