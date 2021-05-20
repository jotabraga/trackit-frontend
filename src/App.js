import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";

export default function App() {

    return(
        <BrowserRouter>          
            
            <Switch>  

                <Route path="/" exact>
                <Today />
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

            </Switch>
            
        </BrowserRouter>
    );
}

