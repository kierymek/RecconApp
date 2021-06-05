import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import { ReconsContextProvider } from './context/ReconsContext';
import UserPanel from './routes/UserPanel';
import RegisterPage from './routes/RegisterPage';
import EditUser from './routes/EditUser';
import ClusterPanel from './routes/ClusterPanel';
import ClusterDetails from "./routes/ClusterDetails";
import ReckonDetails from "./routes/ReconDetails";

const App = () => {
    return (
        <ReconsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/userPanel" component={UserPanel}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <Route exact path="/EditUser" component={EditUser}/>
                        <Route exact path="/ClusterPanel" component={ClusterPanel}/>
                        <Route
                          exact
                          path="/clusterDetails/:groupid"
                          component={ClusterDetails}
                        />
                        <Route exact path="/ReckonDetails/:reckonId" component={ReckonDetails}/>
                    </Switch>
                </Router>
            </div>
        </ReconsContextProvider>
    )
};

export default App;
