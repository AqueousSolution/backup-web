import '../../styling/index.scss'
import RegisterView from './AuthView/RegisterView';
import LogInView from './AuthView/LogInView';
import DashboardView from './DashboardView';
import DistressView from './DistressView/index.jsx'
import { BrowserRouter as Router, Route, Switch,  useRouteMatch } from 'react-router-dom';
import SettingsView from './SettingsView/index.jsx';
import AuthState from '../../store/stakeholder/auth/authState';
import UsersState from '../../store/stakeholder/users/usersState';



function StakeholderView() {

  //const match = useRouteMatch({ path: '/stakeholder' });

  return (
    <>
      <AuthState>
        <UsersState>
            <Router>
              <Switch>
                <Route path='/stakeholder' exact component={LogInView}/>
                <Route path={'/stakeholder/register'} component={RegisterView}/>
                <Route path={'/stakeholder/dashboard'} component={DashboardView}/>
                <Route path={'/stakeholder/distress_log'} component={DistressView}/>
                <Route path={'/stakeholder/settings'} component={SettingsView}/>
              </Switch>
            </Router>
        </UsersState>
      </AuthState>
    </>
  );
}

export default StakeholderView;
