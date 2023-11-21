// import { useState, useEffect } from "react";
// import "./App.css";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
// import { signOut, fetchAuthSession } from "aws-amplify/auth";
// import Routes from "./Routes";
// import { AppContext, AppContextType } from "./lib/contextLib";
// import { onError } from "./lib/errorLib";
// import React from "react";

export default function App() {
  const nav = useNavigate();

  //  // Track if authentication is in progress
  //  const [isAuthenticating, setIsAuthenticating] = useState(true);
  //  // Track is the user has authenticated
  //  const [isAuthenticated, userHasAuthenticated] = useState(false);
 
  //  // Props that'll be passed to all the routes
  //  const routeProps = { isAuthenticated, userHasAuthenticated };
 
  //  useEffect(() => {
  //   onLoad();
  // }, []);

  // async function currentSession() {
  //   try {
  //     const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  // async function onLoad() {
  //   try {
  //     await currentSession();
  //     userHasAuthenticated(true);
  //   } catch (error) {
  //     if (error !== "No current user") {
  //       onError(error);
  //     }
  //   }
  
  //   setIsAuthenticating(false);
  // }
 
  //  async function handleLogout() {
  //    // Log the user out
  //    await signOut();
 
  //    userHasAuthenticated(false);
  //    nav("/login");
  //  }

  return (
    <div>
    {/* {!isAuthenticating && (
      <div className="App">
        <Navbar bg="light" data-bs-theme="light">
          <LinkContainer to="/">
            <Navbar.Brand>
              SST Demo
            </Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle/>
            <Navbar.Collapse>
              <Nav className="me-auto" activeKey={window.location.pathname}>
              {isAuthenticated ? (
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                ) : (
                  <>
                    <LinkContainer to="/signup">
                      <Nav.Link>Signup</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated } as AppContextType}>
          <Routes />
        </AppContext.Provider>
      </div>
    )} */}
    </div>
  );
}
