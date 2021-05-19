import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Habits from "./components/Habits";

export default function App() {

    return(
        <BrowserRouter>


           
            
            <Switch>  

                <Route path="/" exact>
                <Habits />
                </Route>

                <Route path="/cadastro" exact>
                    <Register />
                </Route>

                <Route path="/habitos" exact>
                    <Habits />
                </Route> 


            </Switch>
            
        </BrowserRouter>
    );
}

