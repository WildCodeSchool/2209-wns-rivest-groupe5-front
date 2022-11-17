import {gql, useQuery} from '@apollo/client';
import {Outlet, Navigate} from 'react-router-dom';

const GET_VERIFY_TOKEN = gql`
  query VerifyToken {
    verifyToken
  }
`;

const PrivateRoutes = () => {
    // let auth = localStorage.getItem('token');
    const data = useQuery(GET_VERIFY_TOKEN);
    console.log(data);
  return data.error ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;
