import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_TOKEN_LOGIN = gql`
  query GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password)
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [getToken, { data, loading, error }] = useLazyQuery(GET_TOKEN_LOGIN);

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await getToken({ variables: { email, password } });
    console.log(">>>>data received after login >>>>>", response);
    if (response.data.getToken) {
      localStorage.setItem("token", JSON.stringify(response.data.getToken));
    }
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error during login...</h1>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input
        id="email"
        type="text"
        required
        value={email}
        onChange={handleEmail}
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        required
        value={password}
        onChange={handlePassword}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
