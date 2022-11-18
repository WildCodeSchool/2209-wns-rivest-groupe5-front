import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query getUserById($userId: Float!) {
    getUserById(userId: $userId) {
      lastname
      firstname
      email
    }
  }
`;

const MyAccount = () => {
  const { error, loading, data } = useQuery(GET_USER, {
    variables: { userId: 1 },
  });
  const user = data.getUserById;
  if (loading) <h1>Loading...</h1>;
  if (error) <h1>{error.message}</h1>;

  return (
    <div>
      <h1>Mes infos personnelles</h1>
      <p>Prénom : {user.firstname}</p>
      <p>Nom : {user.lastname}</p>
      <p>Email : {user.email}</p>
    </div>
  );
};

export default MyAccount;
