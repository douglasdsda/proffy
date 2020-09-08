import React from 'react';
import Landing from '../pages/Landing';
import Signin from '../pages/Signin';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';
import Forgot from '../pages/Forgot';
import SignUp from '../pages/SignUp';
import { Switch } from 'react-router-dom';
import Route from "./Route";
import UserCreated from '../pages/UserCreated';
import Profile from '../pages/Profile';
import CreatedShedule from '../pages/CreatedShedule';
import Reset from '../pages/Reset';

function Routes() {
  return (
    <Switch>
      <Route   exact path="/" component={Signin}  />
      <Route path="/Forgot" component={Forgot}  />
      <Route path="/SignUp" component={SignUp}  />
      <Route path="/UserCreated" component={UserCreated}  />
      <Route path="/Reset" component={Reset}  />
      
      <Route isPrivate  path="/Landing" component={Landing}  />
      <Route isPrivate  path="/CreatedShedule" component={CreatedShedule}  />
      <Route isPrivate  path="/Profile" component={Profile}  />
      <Route isPrivate path="/study" component={TeacherList}  />
      <Route isPrivate path="/give-classes" component={TeacherForm}  />
    </Switch>
  );
}

export default Routes;