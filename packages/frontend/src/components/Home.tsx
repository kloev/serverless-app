import { useState, useEffect } from "react";
import "./Home.css";
import { Contacts } from "./Contacts";
import config from "../config";
import { Employees } from "./Employees";

export default function Home() {
  //Clicker
  const [count, setCount] = useState<number | null>(null);

  function onClick() {
    console.log(count);
    fetch(config.apiGateway.URL, {
      method: "POST",
    })
      .then((response) => response.text())
      .then(parseInt)
      .then(setCount);
  }

  return (
    <div className="Home">
      {/* {count && <p>You clicked me {count} times.</p>}
      <button onClick={() => onClick()}>Click Me!</button> */}
      <h1>Northwind</h1>
      <div>
        <Employees />
      </div>
      <h1>Form</h1>
      <div>
        <Contacts />
      </div>
    </div>
  );
}