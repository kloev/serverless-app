import { useState, useEffect } from "react";
import { get } from "aws-amplify/api";
import "./Home.css";
import { Contacts } from "./Contacts";
import config from "../config";
import React from "react";

export default function Home({ isAuthenticated } : {isAuthenticated:boolean}) {
  // const [publicMessage, setPublic] = useState(null);
  // const [privateMessage, setPrivate] = useState(null);

  useEffect(() => {
    // Load our public and private API
    async function onLoad() {
      try {
        await loadPublic();
        // setPublic(response.m);
      } catch (e) {
        // setPublic(false);
      }
      try {
        await loadPrivate();
        // setPrivate(response.message);
      } catch (e) {
        // setPrivate(false);
      }
    }
    onLoad();
  }, [isAuthenticated]);

  function loadPublic() {
    return get({apiName: `${config.apiGateway.URL}`, path: "/"});
  }

  function loadPrivate() {
    return get({apiName: `${config.apiGateway.URL}`, path: "/form"});
  }

  //Clicker
  const [count, setCount] = useState(null);
  
  function onClick() {
      fetch(config.apiGateway.URL, {
      method: "POST",
      })
      .then((response) => response.text())
      .then(()=>setCount);
  }

  return (
    <div className="Home">
    {count && <p>You clicked me {count} times.</p>}
     <button onClick={()=>onClick()}>Click Me!</button>
      <h1>Form</h1>
       <div>
         <Contacts />
      </div>
    </div>
  );
}