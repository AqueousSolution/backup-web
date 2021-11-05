import '../../styling/index.scss'
import RegisterView from './AuthView/RegisterView';
import LogInView from './AuthView/LogInView';
import DistressCallsView from './DistressCallsView';
import HistoryLogView from './HistoryLogView/index.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SettingsView from './SettingsView/index.jsx';
import AuthState from '../../store/stakeholder/auth/authState';
import UsersState from '../../store/stakeholder/users/usersState';
import ForgotPassword from './AuthView/ForgotPassword';
import ResetPassword from './AuthView/ResetPassword';
import Policy from '../Policy';
import StakeholderPolicy from './StakeholderPolicy';
import LandingPage from '../LandingPage'



function StakeholderView() {


  return (
    <>
      <AuthState>
        <UsersState>
            <Router>
              <Switch>
                <Route path='/' exact component={LandingPage}/>
                <Route path='/policy' exact component={Policy}/>
                <Route path='/stakeholder-policy' exact component={StakeholderPolicy}/>
                <Route path='/stakeholder' exact component={LogInView}/>
                <Route path='/stakeholder/forgot_password' exact component={ForgotPassword}/>
                <Route path='/stakeholder/reset_password' exact component={ResetPassword}/>
                <Route path={'/stakeholder/register'} component={RegisterView}/>
                <Route path={'/stakeholder/distress_calls'} component={DistressCallsView}/>
                <Route path={'/stakeholder/history_log'} component={HistoryLogView}/>
                <Route path={'/stakeholder/settings'} component={SettingsView}/>
              </Switch>
            </Router>
        </UsersState>
      </AuthState>
    </>
  );
}

export default StakeholderView;
