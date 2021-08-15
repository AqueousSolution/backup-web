
import TextField from '@material-ui/core/TextField';
import SidebarView from "../SidebarView";
import MetricCard from "../../../components/MetricCard";
import CardIcon from '../../../assets/metric-img.svg';
import LogItem from "./LogItem";
//import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import { useContext,useEffect, useState } from "react";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import UsersContext from '../../../store/stakeholder/users/usersContext';
import { useHistory } from 'react-router-dom'
  
  

const DistressView = () => {

    //const {emergencyList,setEmergencyList} = useState([])
    //const {requestState, setRequeststate} = useState(false)
    const[progressCases, setProgressCases] = useState(0)
    const[resolvedCases, setResolvedCases] = useState(0)
    const {loadStakeholderUser, stakeholderUser} = useContext(AuthContext)
    const {getMyEmergencies, myEmergencies} = useContext(UsersContext)
    const history = useHistory()

    const [date,setDate]=useState({
        startDate:'start date',
        endDate:''
    })

    const handleDateChange = (e) =>{
        setDate({...date,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        loadStakeholderUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!stakeholderUser){
            history.replace('/stakeholder')
        }
    },[stakeholderUser])

    useEffect(()=>{
        getMyEmergencies()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        calculateProgressCases()
        calculateResolvedCases()
    },[myEmergencies])

    const calculateProgressCases = () =>{
        let total=[]
        if(myEmergencies){
          total = myEmergencies.filter(emergency=> emergency.status==='in-progress')
          return setProgressCases(total.length)
        } 
    }

    const calculateResolvedCases = () =>{
        let total=[]
        if(myEmergencies){
          total = myEmergencies.filter(emergency=> emergency.status==='resolved')
          return setResolvedCases(total.length)
        } 
    }


    const [selectedDate, setSelectedDate] = useState(
        new Date('2021-08-18T21:11:54'),
      );

   
    
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
                        <MetricCard icon={CardIcon} name='Total Cases' number={myEmergencies ? myEmergencies.length : 0}/>
                        {/* <MetricCard icon={CardIcon} name='Pending Cases' number='900' /> */}
                        <MetricCard icon={CardIcon} name='In progress' number={progressCases} />
                        <MetricCard icon={CardIcon} name='Resolved Cases' number={resolvedCases} />
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
                        
                        <TextField
                            id="date"
                            type="date"
                            name='startDate'
                            variant='outlined'
                            id="outlined-helperText"
                            label="Start Date"
                            style={{backgroundColor: '#EBEEF5',width:'9rem',borderRadius:'.5rem'}}
                            value={date.startDate}
                            onChange={handleDateChange}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                       
                       <TextField
                            id="date"
                            type="date"
                            name='endDate'
                            variant='outlined'
                            id="outlined-helperText"
                            label="End Date"
                            style={{backgroundColor: '#EBEEF5',width:'9rem' ,borderRadius:'.5rem'}}
                            value={date.endDate}
                            onChange={handleDateChange}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />

                        <input type="text" className='search' placeholder='Search'/>
                        <button className='apply'>Apply Filter</button>
                        <button className='clear'>Clear filter</button>
                    </div>
                 
                {
                    myEmergencies.length ?
                    myEmergencies.map(emergencies=>(
                        <LogItem 
                        key={emergencies.id}
                        FullName={emergencies.user.firstname + ' ' + emergencies.user.lastname}
                        Phone={emergencies.user.phone}
                        Email={emergencies.user.email}
                        Location='No 10, Jordan street, Oregun...'
                        Status={emergencies.status}
                        Comment='3'
                    />
                    )):
                    <p>You have not accepted any emergency</p>
                }
                </main>
            </section>
            
        </div>
     );
}
 
export default DistressView;