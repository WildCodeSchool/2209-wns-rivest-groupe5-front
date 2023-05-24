import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../interfaces/user";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Link,
  Card,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Collapse,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import BasicModal from "../components/common/Modal";
import { uploadPictureToCloudinary } from "../utils/upLoadPictureToCloudinary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CREATE_USER } from "../graphql/queries/users/createUser";


const RegisterPage = () => {
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [imageToUpload, setImageToUpload] = useState<File>();
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [openFailureModal, setOpenFailureModal] = useState<boolean>(false);
  const [openExistingUserModal, setOpenExistingUserModal] =
    useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const [passwordsMatching, setPasswordsMatching] = useState<boolean>(true);
  const [userData, setUserData] = useState<Partial<UserInterface>>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordconfirm: "",
  });

  const navigate = useNavigate();
  const [createUser, { loading: isLoadingUserCreation, error }] =
    useMutation(CREATE_USER);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setOpenError(false);
        setPasswordsMatching(true);
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

  function triggerCreateUser(cloudinaryLink?: string) {
    return createUser({
      variables: {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
        avatar: cloudinaryLink ? cloudinaryLink : "",
      },
      onCompleted(data) {
        setIsSendingImage(false);
        setOpenSuccessModal(true);
      },
      onError(error) {
        setIsSendingImage(false);
        if (error.message.includes("duplicate key value")) {
          // alert("Already existing account");
          setOpenExistingUserModal(true);
        } else {
          // alert("Register failed");
          setOpenFailureModal(true);
        }
      },
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { password, passwordconfirm } = userData;
    // check if all required fields are provided
    if (
      userData.email === "" ||
      userData.firstname === "" ||
      userData.lastname === "" ||
      userData.password === "" ||
      userData.passwordconfirm === ""
    ) {
      setPasswordsMatching(false);
      setErrorMsg("Please fill in all required fields !");
      setOpenError(true);
      return;
    }
    // check if password and passwordconfirm match
    if (password !== passwordconfirm) {
      setErrorMsg("Passwords do not match !");
      setOpenError(true);
      return;
    }
    // check if user uploaded an image/avatar
    if (imageToUpload) {
      // if user uploaded an image/avatar send it to cloudinary
      setIsSendingImage(true);
      const respFromImageService : string = await uploadPictureToCloudinary(
        imageToUpload
      );
      // if image upload to cloudinary is successful
      if (!respFromImageService.includes("Failed to upload picture")) {
        // create user with avatar
        triggerCreateUser(respFromImageService);
      } else {
        // if image upload to cloudinary failed => create new user without avatar
        triggerCreateUser();
      }
      // if user did not upload an image/avatar => create new user without avatar
    } else {
      triggerCreateUser();
    }
  }

  return (
    <div>
      <BasicModal
        text="Compte crée avec succès!"
        buttonText="Se connecter"
        openModal={openSuccessModal}
        handleClose={() => {
          setOpenSuccessModal(false);
        }}
        action={() => {
          navigate("/login");
        }}
        iconType="success"
      />
      <BasicModal
        text="Compte existant merci de vous connecter"
        buttonText="Se Connecter"
        openModal={openExistingUserModal}
        handleClose={() => {
          setOpenExistingUserModal(false);
        }}
        action={() => {
          navigate("/login");
        }}
        iconType="error"
      />
      <BasicModal
        text="Echec de l'inscription, veuillez retenter"
        buttonText="S'inscrire"
        openModal={openFailureModal}
        handleClose={() => {
          setOpenFailureModal(false);
        }}
        action={() => {
          setOpenFailureModal(false);
        }}
        iconType="error"
      />
      <Container component="main" maxWidth="md" sx={{ pt: 5 }}>
        <Card
          sx={{
            pt: 4,
            pb: 4,
            pr: 5,
            pl: 5,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "#90CAF9",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
              Register
            </Typography>
            <Collapse in={openError}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {errorMsg}
              </Alert>
            </Collapse>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="Firstname"
                  name="firstname"
                  autoComplete="firstname"
                  onChange={handleChange}
                  value={userData.firstname}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  name="lastname"
                  autoComplete="lastname"
                  onChange={handleChange}
                  value={userData.lastname}
                />
              </Stack>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={userData.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                id="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={userData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordconfirm"
                id="passwordconfirm"
                label="Password Confirm"
                variant="outlined"
                type={showPasswordConfirm ? "text" : "password"}
                value={userData.passwordconfirm}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPasswordConfirm}
                      >
                        {showPasswordConfirm ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AccountCircleIcon />}
                  sx={{ mt: "10px" }}
                >
                  Choisir une photo
                  <input
                    type="file"
                    hidden
                    onChange={(event) => {
                      if (event.target.files) {
                        setImageToUpload(event.target.files[0]);
                      }
                    }}
                  />
                </Button>
                <Typography ml={2}>
                  {imageToUpload?.name && imageToUpload.name}
                </Typography>
              </Box>

              <LoadingButton
                type="submit"
                fullWidth
                loading={isLoadingUserCreation || isSendingImage}
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                id="submit-button"
              >
                Create account
              </LoadingButton>
              <Link
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Se connecter?
              </Link>
            </Box>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;