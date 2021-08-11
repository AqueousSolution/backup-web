import '../../styling/index.scss'
import RegisterView from './AuthView/RegisterView';
import LogInView from './AuthView/LogInView';
import DashboardView from './DashboardView';
import StakeholdersView from './StakeholdersView';
import DistressView from './DistressView/index.jsx'
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
                  <Route path='/' exact component={LogInView}/>
                  <Route path='/login' exact component={LogInView}/>
                  <Route path='/register' exact component={RegisterView}/>
                  <Route path='/dashboard' exact component={DashboardView}/>
                  <Route path='/distress_log' exact component={DistressView}/>
                  <Route path='/stakeholders' exact component={StakeholdersView}/>
                  <Route path='/settings' exact component={SettingsView}/>
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
