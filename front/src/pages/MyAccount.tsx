import { gql, useQuery } from "@apollo/client";
import { Box, TextField, Typography } from "@mui/material";
import {currentUserState} from '../atom/currentUserAtom';
import {useRecoilValue} from 'recoil';
import { useState } from "react";

const GET_USER = gql`
  query getUserById($userId: Float!) {
    getUserById(userId: $userId) {
      email
      firstname
      lastname
    }
  }
`;

const MyAccount = () => {
  //TODO Add user context to get userId
  const currentUser = useRecoilValue(currentUserState);
  // const [user, setUser] = useState([])

  // setUser(currentUser?)

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
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
          sx={{mb: 4}}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Nom"
          defaultValue={currentUser?.lastname}
          sx={{mb: 4}}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          defaultValue={currentUser?.email}
          sx={{mb: 4}}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </Box>
  );
};

export default MyAccount;
