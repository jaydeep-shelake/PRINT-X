import React from 'react';
import SignUp from './Components/Authentication/SignUp';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Authentication/Login';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute'
import ForgatPassword from './Components/Authentication/ForgatPassword';
import UpdateProfile from './Components/Authentication/UpdateProfile';
import MianDashboard from './Components/PrintX/Dashboard';
import GivePoints from './Components/PrintX/GivePoints'
import {Authprovider} from './Context/AuthContext';
const App = () => {
    return (
              <Router>
                  <Authprovider>
                  <Switch>
                 
                     {/*Print Routes*/}
                      <PrivateRoute exact path="/" component={MianDashboard}/>
                      <PrivateRoute exact path="/folder/:folderId" component={MianDashboard}/>
                     {/* Profile Routes */}

                     <PrivateRoute  path="/user" component={Dashboard}/>
                     <PrivateRoute  path="/updateProfile" component={UpdateProfile}/>

                        {/* Auth Routes */}
                      <AdminRoute path="/signup" component={SignUp}/>
                      <AdminRoute path="/givepoints" component={GivePoints}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/resetPassword" component={ForgatPassword}/>

                  </Switch>
                  </Authprovider> 
              </Router>
    )
}

export default App
