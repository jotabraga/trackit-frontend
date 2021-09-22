import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./components/Sign-In/SignIn";
import Register from "./components/Register/Register";
import Habits from "./components/Habits/Habits";
import Today from "./components/Today/Today";
import { useState } from "react";
import { UserProvider } from "./Contexts/UserContext";
import ProgressContext from "./Contexts/ProgressContext";
import ConditionalRoute from "./Conditional-route/ConditionalRoute";
import ensureAuthenticated from "./Conditional-route/EnsureAuthenticated";

export default function App() {
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
            <ConditionalRoute check={ensureAuthenticated} path="/habitos" exact>
              <Habits />
            </ConditionalRoute>
            <ConditionalRoute check={ensureAuthenticated} path="/hoje" exact>
              <Today />
            </ConditionalRoute>
          </ProgressContext.Provider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}


