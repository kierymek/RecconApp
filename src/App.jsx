import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./routes/Home";
import { ReconsContextProvider } from './context/ReconsContext';
import UserPanel from './routes/UserPanel';
import Register from './routes/Register';

const App = () => {
    return (
        <ReconsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/userPanel" component={UserPanel}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </Router>
            </div>
        </ReconsContextProvider>
    )
};

export default App;