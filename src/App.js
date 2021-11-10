import "./App.css";
import React from "react";
import Forms from "./components/Form/Forms";
import Logger from "./components/Logger/Logger";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = useState({});

  return (
    <header className="App-header">
      <div className="container mt-5">
        <Switch>
          <Route exact path="/">
        <Forms setIsLoggedIn={setIsLoggedIn} setValue={setValue}/> 
        </Route>

        <Route exact path="/logger">
        <Logger setValue={setValue} value={value} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
        </Route>
        </Switch>
      </div>
    </header>
  );
}

export default App;
