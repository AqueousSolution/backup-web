
import TextField from '@material-ui/core/TextField';
import SidebarView from "../SidebarView";
import MetricCard from "../../../components/MetricCard";
import CardIcon from '../../../assets/metric-img.svg';
import ArrowLeft from '../../../assets/backward-arrow.svg';
import ArrowRight from '../../../assets/forward-arrow.svg';
import LogItem from "./LogItem";
import EmergenciesContext from "../../../store/admin/emergencies/emergenciesContext";
import { useContext,useEffect, useState } from "react";
import AuthContext from "../../../store/admin/auth/authContext";
import { useHistory } from 'react-router-dom'
  
  

const DistressView = () => {

    //const {emergencyList,setEmergencyList} = useState([])

    const { emergenciesList, emergenciesStats, getEmergenciesStats, getEmergencies, pageCount } = useContext(EmergenciesContext)
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const history = useHistory()
    const [ emergenciesState, setEmergenciesState ] = useState(null)
    const [ stats, setStats ] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)


    const [date,setDate]=useState({
        startDate:'2021-10-10',
        endDate:''
    })

    const handleDateChange = (e) =>{
        setDate({...date,[e.target.name]:e.target.value})
    }

   const nextPage = () =>{
        if(currentPage < noOfPages){
        setCurrentPage(currentPage + 1)
       } 
   }

   console.log(currentPage)

   const previousPage = () =>{
       if(currentPage > 1){
        setCurrentPage(currentPage - 1)
       }
    
}

    useEffect(()=>{
        loadAdminUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!adminUser){
            history.replace('/admin')
        }
    },[adminUser])

    useEffect(()=>{
        getEmergencies(currentPage)
        getEmergenciesStats()
        /*eslint-disable*/
    },[currentPage])

    useEffect(()=>{
      setEmergenciesState(emergenciesList)
      setStats(emergenciesStats)
      setNoOfPages(pageCount)
    },[pageCount,emergenciesList,emergenciesStats])



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
                        emergenciesState && emergenciesState.length ?

                        emergenciesState.map((emergency,index)=>(
                            <LogItem 
                            key={index}
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
                    <div className='pagination'>
                        <span>Page Selected</span>
                        <div className="pagination-center">
                            <img src={ArrowLeft} alt="left" onClick={previousPage}/>
                            <ul>
                                {/* <li>1</li>
                                <li>2</li>
                                <li>3</li> */}
                                {Array.from(Array(pageCount).keys()).map((arr,index)=><li key={index}>{arr + 1 === currentPage ? <span>{arr + 1}</span> : arr + 1}</li>)}
                            </ul>
                            <img src={ArrowRight} alt="right" onClick={nextPage}/>
                        </div>
                        <span>{(currentPage-1) * 10}-{currentPage * 10} of {emergenciesStats .all}</span>
                    </div>

                </main>
            </section>
            
        </div>
     );
}
 
export default DistressView;