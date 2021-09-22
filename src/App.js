import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./components/Sign-In/SignIn";
import Register from "./components/Register/Register";
import Habits from "./components/Habits/Habits";
import Today from "./components/Today/Today";
import { useState } from "react";
import { UserProvider } from "./Contexts/UserContext";
import ProgressContext from "./Contexts/ProgressContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
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
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}
