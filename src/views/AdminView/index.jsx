import '../../styling/index.scss'
import RegisterView from './AuthView/RegisterView';
import LogInView from './AuthView/LogInView';
import DashboardView from './DashboardView';
import StakeholdersView from './StakeholdersView';
import DistressView from './DistressView/index.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SettingsView from './SettingsView/index.jsx';
import AuthState from '../../store/auth/authState';
import UsersState from '../../store/users/usersState';
import EmergenciesState from '../../store/emergencies/emergenciesState';



function AdminView() {
  return (
    <>
      <AuthState>
        <EmergenciesState>
          <UsersState>
            <Router>
              <Switch>
              <Route path='/login' component={LogInView}/>
                <Route path='/register' component={RegisterView}/>
                <Route path='/dashboard' component={DashboardView}/>
                <Route path='/distress_log' component={DistressView}/>
                <Route path='/stakeholders' component={StakeholdersView}/>
                <Route path='/settings' component={SettingsView}/>
              </Switch>
            </Router>
          </UsersState>
        </EmergenciesState>
      </AuthState>
    </>
  );
}

export default AdminView;
