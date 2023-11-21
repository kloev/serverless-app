import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import config from "./config";
import { BrowserRouter as Router } from "react-router-dom";

// Init Amplify
Amplify.configure({
  Auth: {
    Cognito:{
      userPoolClientId: config.cognito.USER_POOL_CLIENT_ID,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      allowGuestAccess: false, 
      // userPoolEndpoint: config.apiGateway.URL

    },
    // mandatorySignIn: true,
    // region: config.cognito.REGION,
    // userPoolWebClientId: config.cognito.USER_POOL_CLIENT_ID,
  },
  API: {
    REST: {
      config:{
        // name: "notes",
        service: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION, 
      }
    },
  },
});

ReactDOM.render(
  // <Router>
    <App />
  // </Router>
,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
