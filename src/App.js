import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./components/Sign-In/SignIn";
import Register from "./components/Register/Register";
import Habits from "./components/Habits/Habits";
import Today from "./components/Today/Today";
import Historic from "./components/Historic/Historic";
import { UserProvider } from "./Contexts/UserContext";
import { ProgressProvider } from "./Contexts/ProgressContext";
import ConditionalRoute from "./Conditional-route/ConditionalRoute";
import ensureAuthenticated from "./Conditional-route/EnsureAuthenticated";

export default function App() {

  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <ProgressProvider>
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
            <ConditionalRoute check={ensureAuthenticated} path="/hoje" exact>
              <Historic />
            </ConditionalRoute>
          </ProgressProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
}


