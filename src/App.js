import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import UserContext from "./components/UserContext";
import { useState } from "react";
import ProgressContext from "./components/ProgressContext";


export default function App() {

    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);

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

                    <ProgressContext.Provider value={{progress, setProgress}}>                  

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

