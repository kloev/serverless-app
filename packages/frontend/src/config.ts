const config = {
    // Backend config
    apiGateway: {
      REGION: process.env.REACT_APP_REGION as string,
      URL: process.env.REACT_APP_API_URL as string,
    },
    cognito: {
      REGION: process.env.REACT_APP_REGION as string,
      USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID as string,
      USER_POOL_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID as string,
      IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID as string,
    },
  };
  export default config;