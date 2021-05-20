import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import UserContext from "./components/UserContext";
import { useState } from "react";


export default function App() {

    const [user, setUser] = useState(null);

    return(
        <BrowserRouter>          
            
            <Switch>  
                <UserContext.Provider value={{user, setUser}}>

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

                </UserContext.Provider>

            </Switch>
            
        </BrowserRouter>
    );
}

