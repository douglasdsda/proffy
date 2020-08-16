import React from 'react';
import { BrowserRouter, Route  } from 'react-router-dom';
import Landing from '../pages/Landing';
import Signin from '../pages/Signin';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';
import Forgot from '../pages/Forgot';

function Routes() {
  return (
    <BrowserRouter>
      <Route   exact path="/" component={Signin}  />
      <Route path="/Forgot" component={Forgot}  />
      <Route isPrivate  path="/Landing" component={Landing}  />
      <Route isPrivate path="/study" component={TeacherList}  />
      <Route isPrivate path="/give-classes" component={TeacherForm}  />
    </BrowserRouter>
  );
}

export default Routes;