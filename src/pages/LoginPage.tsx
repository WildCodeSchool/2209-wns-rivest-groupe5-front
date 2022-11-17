import { gql, useLazyQuery } from "@apollo/client";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


const GET_TOKEN_LOGIN = gql`
  query GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password)
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [getToken, {loading, error}] = useLazyQuery(GET_TOKEN_LOGIN);

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getToken({
      variables: {email, password},
      onCompleted(data) {
        console.log('>>>>>token >>>>>>', data.getToken);
        localStorage.setItem('token', data.getToken);
        navigate('/');
      },
      onError(error) {
        console.log(error);
      },
    });
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
