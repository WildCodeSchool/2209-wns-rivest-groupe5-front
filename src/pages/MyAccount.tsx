import { gql, useQuery } from "@apollo/client";
import { Box, TextField, Typography } from "@mui/material";

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
  const userId = 1;
  const { error, loading, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  if (loading) return <p>Is loading</p>;
  if (error) return <p>{error.message}</p>;

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
          label="Prènom"
          defaultValue={data.getUserById.firstname}
          sx={{ mb: 4 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Nom"
          defaultValue={data.getUserById.lastname}
          sx={{ mb: 4 }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          defaultValue={data.getUserById.email}
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
