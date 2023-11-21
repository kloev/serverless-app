import { useState } from "react";
import "./App.css";
import config from "./config";

function App() {
  const [count, setCount] = useState(null);

  function onClick() {
    console.log(import.meta.env.REACT_APP_API_URL);
    console.log(config.apiGateway.URL);
    // return post("Api", "/");
    fetch(config.apiGateway.URL, {
      method: "POST",
    })
      .then((response) => response.text())
      .then(() => setCount);
  }

  return (
    <>
      <h1>Clicker</h1>
      <div className="card">
        <button onClick={() => onClick()}>count is {count}</button>
        <p>click click</p>
      </div>
    </>
  );
}

export default App;
