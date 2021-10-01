import React from 'react';
import '../../styling/index.scss'
import RegisterView from './AuthView/RegisterView';
import LogInView from './AuthView/LogInView';
import DashboardView from './DashboardView';
import StakeholdersView from './StakeholdersView';
import DistressView from './DistressView/index.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SettingsView from './SettingsView/index.jsx';
import AuthState from '../../store/admin/auth/authState';
import UsersState from '../../store/admin/users/usersState';
import StakeholdersState from '../../store/admin/stakeholders/stakeholdersState';
import EmergenciesState from '../../store/admin/emergencies/emergenciesState';



function AdminView() {


  return (
    <>
      <AuthState>
        <StakeholdersState>
          <EmergenciesState>
            <UsersState>
              <Router>
                <Switch>
                  <Route path='/admin' exact component={LogInView}/>
                  <Route path='/admin/register'  component={RegisterView}/>
                  <Route path={'/admin/dashboard'}  component={DashboardView}/>
                  <Route path='/admin/distress_log' component={DistressView}/>
                  <Route path='/admin/stakeholders' component={StakeholdersView}/>
                  <Route path='/admin/settings' component={SettingsView}/>
                </Switch>
              </Router>
            </UsersState>
          </EmergenciesState>
        </StakeholdersState>
      </AuthState>
    </>
  );
}

export default AdminView;
