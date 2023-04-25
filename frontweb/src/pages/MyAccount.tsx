import { Box, TextField, Typography } from "@mui/material";
import { currentUserState } from "../atom/currentUserAtom";
import { useRecoilValue } from "recoil";

const MyAccount = () => {
    const currentUser = useRecoilValue(currentUserState);

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: "100%",
            }}
        >
            <Typography variant="h1" gutterBottom>
                Mes infos personnelles
            </Typography>
            <div>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Prénom"
                    defaultValue={currentUser?.firstname}
                    sx={{ mb: 4 }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Nom"
                    defaultValue={currentUser?.lastname}
                    sx={{ mb: 4 }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Email"
                    defaultValue={currentUser?.email}
                    sx={{ mb: 4 }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </div>
        </Box>
    );
};

export default MyAccount;
