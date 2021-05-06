import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./routes/Home";
import { ReconsContextProvider } from './context/ReconsContext';
import UserPanel from './routes/UserPanel';
import RegisterPage from './routes/RegisterPage';
import UserDataEditPanel from './routes/UserDataEditPanel';

const App = () => {
    return (
        <ReconsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/userPanel" component={UserPanel}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <Route exact path="/userDataEditPanel" component={UserDataEditPanel}/>

                    </Switch>
                </Router>
            </div>
        </ReconsContextProvider>
    )
};

export default App;