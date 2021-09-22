import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./components/Sign-In/SignIn";
import Register from "./components/Register/Register";
import Habits from "./components/Habits/Habits";
import Today from "./components/Today/Today";
import UserContext from "./Contexts/UserContext";
import { useState } from "react";
import ProgressContext from "./Contexts/ProgressContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <ProgressContext.Provider value={{ progress, setProgress }}>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/cadastro" exact>
              <Register />
            </Route>
            <Route path="/habitos" exact>
              <Habits />
            </Route>
            <Route path="/hoje" exact>
              <Today />
            </Route>
          </ProgressContext.Provider>
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
