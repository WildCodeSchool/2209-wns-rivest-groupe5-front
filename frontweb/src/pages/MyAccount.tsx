import {
    Box,
    FormControlLabel,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { currentUserState } from "../atom/currentUserAtom";
import { useRecoilState } from "recoil";
import { useLazyQuery, useMutation } from "@apollo/client";
import { TOGGLE_USER_VISIBILITY } from "../graphql/mutations/users/toggleUserVisibilityMutation";
import { GET_MY_USER_DATA } from "../graphql/queries/users/getMyUserData";

const MyAccount = () => {
    const [user, setUser] = useRecoilState(currentUserState);

    const [toggleUserVisibility, { loading, error }] = useMutation(
        TOGGLE_USER_VISIBILITY
    );
    const [getMyUserData, { loading: userLoading }] = useLazyQuery(
        GET_MY_USER_DATA,
        {
            fetchPolicy: "no-cache",
        }
    );

    // TODO : gestion loading et error notif

    const handleTogglePublicProfile = async () => {
        await toggleUserVisibility();
        await getMyUserData({
            fetchPolicy: "no-cache",
            onCompleted(data) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.getMyUserData)
                );
                setUser(data.getMyUserData);
            },
            onError(error) {
                console.log(error);
            },
        });
    };

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: "100%",
            }}
        >
            <Typography variant="h3" gutterBottom>
                Mes infos personnelles
            </Typography>
            <div>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Prénom"
                    defaultValue={user?.firstname}
                    sx={{ mb: 4 }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Nom"
                    defaultValue={user?.lastname}
                    sx={{ mb: 4 }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Email"
                    defaultValue={user?.email}
                    sx={{ mb: 4 }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            onChange={handleTogglePublicProfile}
                            checked={user?.visibility === "public"}
                        />
                    }
                    label="Profil public"
                />
            </div>
        </Box>
    );
};

export default MyAccount;
