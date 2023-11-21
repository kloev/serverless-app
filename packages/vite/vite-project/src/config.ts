const config = {
    // Backend config
    apiGateway: {
      REGION: import.meta.env.REACT_APP_REGION ,
      URL: import.meta.env.REACT_APP_API_URL ,
      NAME : import.meta.env.REACT_APP_API_NAME
    },
    cognito: {
      REGION: import.meta.env.REACT_APP_REGION ,
      USER_POOL_ID: import.meta.env.REACT_APP_USER_POOL_ID ,
      USER_POOL_CLIENT_ID: import.meta.env.REACT_APP_USER_POOL_CLIENT_ID ,
      IDENTITY_POOL_ID: import.meta.env.REACT_APP_IDENTITY_POOL_ID ,
    },
  };
  export default config;