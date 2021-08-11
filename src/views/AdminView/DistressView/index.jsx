import SidebarView from "../SidebarView";
import MetricCard from "../../../components/MetricCard";
import CardIcon from '../../../assets/metric-img.svg';
import LogItem from "./LogItem";
//import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import EmergenciesContext from "../../../store/admin/emergencies/emergenciesContext";
import { useContext,useEffect, useState } from "react";
import AuthContext from "../../../store/admin/auth/authContext";
import { useHistory } from 'react-router-dom'
  
  

const DistressView = () => {

    //const {emergencyList,setEmergencyList} = useState([])

    const { emergenciesList, emergenciesStats, getEmergenciesStats, getEmergencies } = useContext(EmergenciesContext)
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const history = useHistory()
    const [ emergenciesState, setEmergenciesState ] = useState(null)
    const [ stats, setStats ] = useState(null)

    console.log(emergenciesState)

    useEffect(()=>{
        loadAdminUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!adminUser){
            history.replace('/login')
        }
    },[adminUser])

    useEffect(()=>{
        getEmergencies()
        getEmergenciesStats()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
      setEmergenciesState(emergenciesList)
      setStats(emergenciesStats)
    },[emergenciesList,emergenciesStats])


    const [selectedDate, setSelectedDate] = useState(
        new Date('2021-08-18T21:11:54'),
      );

      const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    
      const StyledDatePicker = withStyles({
        root: {
          background: '#EBEEF5',
          borderRadius: 8,
          color: 'white',
          height: '2rem',
          width: '7.2rem',
          opacity:.6,
          fontSize: '6.625rem',
    
        }
      })(KeyboardDatePicker);

    return ( 
        <div className='main'>
            <SidebarView />
            <section className='distress'>
                <header className='distress-header'>
                    <h1 className="distress-header__title">Distress calls</h1>
                    <div className="distress-header__metrics">
                        <MetricCard icon={CardIcon} name='Total Cases' number={stats && stats.all}/>
                        <MetricCard icon={CardIcon} name='Pending Cases' number={stats && stats.pending} />
                        <MetricCard icon={CardIcon} name='In progress' number={stats && stats.in_progress} />
                        <MetricCard icon={CardIcon} name='Resolved Cases' number={stats && stats.resolved} />
                    </div>
                </header>
                <main className="distress-body">
                    <div className="distress-body__filters">
{/*                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <StyledDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                         </MuiPickersUtilsProvider>  */}
                        <button className='date'>Start date</button>
                        <button className='date'>End date</button>
                        <input type="text" className='search' placeholder='Search'/>
                        <button className='apply'>Apply Filter</button>
                        <button className='clear'>Clear filter</button>
                    </div>
                    {
                        emergenciesState && emergenciesState.length ?

                        emergenciesState.map((emergency)=>(
                            <LogItem 
                            FullName={emergency.user.firstname}
                            Phone={emergency.user.phone}
                            Email={emergency.user.email}
                            Location={emergency.user.profile.lga.name + ', ' + emergency.user.profile.state.name}
                            Status={emergency.status}
                            Comment='3'
                        /> 
                        ))
                       :
                        <div className="no-data-distress">
                        <h3>There are no distress logs at the moment</h3>
                        <p>There are no distress logs at the moment</p>
                    </div>
                    }

                </main>
            </section>
            
        </div>
     );
}
 
export default DistressView;