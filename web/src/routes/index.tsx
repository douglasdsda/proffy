import React from 'react';
import { BrowserRouter  } from 'react-router-dom';
import Landing from '../pages/Landing';
import Signin from '../pages/Signin';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';
import Forgot from '../pages/Forgot';
import SignUp from '../pages/SignUp';
import { Switch } from 'react-router-dom';
import Route from "./Route";
import UserCreated from '../pages/UserCreated';

function Routes() {
  return (
    <Switch>
      <Route   exact path="/" component={Signin}  />
      <Route path="/Forgot" component={Forgot}  />
      <Route path="/SignUp" component={SignUp}  />
      <Route path="/UserCreated" component={UserCreated}  />
      
      <Route isPrivate  path="/Landing" component={Landing}  />
      <Route isPrivate path="/study" component={TeacherList}  />
      <Route isPrivate path="/give-classes" component={TeacherForm}  />
    </Switch>
  );
}

export default Routes;