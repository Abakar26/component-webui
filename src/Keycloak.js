/* eslint-disable no-undef */
import Keycloak from 'keycloak-js';

const realm = process.env.REACT_APP_KEYCLOAK_REALM;
const url = process.env.REACT_APP_KEYCLOAK_URL;
const clientId = process.env.REACT_APP_KEYCLOAK_CLIENTID;



const keycloakConfig = {
  realm: realm,
  url: url,
  clientId: clientId,
};

const mykeycloak = new Keycloak(keycloakConfig);

export default mykeycloak;