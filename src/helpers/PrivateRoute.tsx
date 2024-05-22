import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = ({ children, setToken, token }: any) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  if (isLoggedIn) {
    sessionStorage.setItem('token', JSON.stringify(keycloak.token))
    setToken(true);
    console.log(keycloak.idTokenParsed)

  }

  return (isLoggedIn || token) ? children : null;
};


export default PrivateRoute;