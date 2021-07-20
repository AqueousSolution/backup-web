import '../styling/index.scss'
import DashboardView from './DashboardView';
import StakeholdersView from './StakeholdersView';
import DistressView from './DistressView/index.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SettingsView from './SettingsView/index.jsx';

function RootView() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/dashboard' component={DashboardView}/>
        <Route path='/distress_log' component={DistressView}/>
        <Route path='/stakeholders' component={StakeholdersView}/>
        <Route path='/settings' component={SettingsView}/>
      </Switch>
     </Router>
    </>
  );
}

export default RootView;
