
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

    const { emergenciesList, emergenciesStats, getEmergenciesStats, getEmergencies, pageCount, searchEmergencies, searchResults, clearSearch, filterEmergencies, filterResults, clearFilter } = useContext(EmergenciesContext)
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const history = useHistory()
    const [ emergenciesState, setEmergenciesState ] = useState(null)
    const [ stats, setStats ] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)

    const[searchQuery, setSearchQuery] = useState('')


    const [date,setDate]=useState({
        startDate:'2021-07-01',
        endDate:''
    })

    const handleDateChange = (e) =>{
        setDate({...date,[e.target.name]:e.target.value})
    }

    const handleSearch = (e) =>{
       setSearchQuery(e.target.value)
    }

   const nextPage = () =>{
        if(currentPage < noOfPages){
        setCurrentPage(currentPage + 1)
       } 
   }

   const previousPage = () =>{
       if(currentPage > 1){
        setCurrentPage(currentPage - 1)
       }
    }

    const applyFilter = () =>{
        if(date.startDate && date.endDate){
            filterEmergencies(date.startDate,date.endDate)
        }   
    }

    const clear = () =>{
        clearFilter()
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


    useEffect(()=>{
        if(searchQuery){
            searchEmergencies(searchQuery)
        }else{
            clearSearch()
        }
    },[searchQuery])

    useEffect(()=>{
        if(searchResults){
            setEmergenciesState(searchResults.data)
        }else{
            setEmergenciesState(emergenciesList)
        }
    },[searchResults])

    useEffect(()=>{
        if(filterResults){
            setEmergenciesState(filterResults.data)
        }else{
            setEmergenciesState(emergenciesList)
        }
    },[filterResults])

    console.log(emergenciesState)

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
                        <input type="text" className='search' placeholder='Search' value={searchQuery} onChange={handleSearch}/>
                        <button className='apply' onClick={applyFilter}>Apply Filter</button>
                        <button className='clear' onClick={clear}>Clear filter</button>
                    </div>
                    {
                        emergenciesState && emergenciesState.length ?

                        emergenciesState.map((emergency,index)=>(
                            <LogItem 
                            key={index}
                            EmergencyId={emergency.id}
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
                        <h3>{filterResults || searchResults ? 'There are no results for this search' : 'There are no distress logs at the moment'}</h3>
                        <p>{filterResults || searchResults ? 'There are no results for this search' : 'There are no distress logs at the moment'}</p>
                    </div>
                    }
                    <div className='pagination'>
                        <span>{currentPage + '/' + noOfPages}</span>
                        <div className="pagination-center">
                            <img src={ArrowLeft} alt="left" onClick={previousPage}/>
                            <ul>
                                {Array.from(Array(pageCount).keys()).map((arr,index)=><li key={index}>{arr + 1 === currentPage ? <span>{arr + 1}</span> : arr + 1}</li>)}
                            </ul>
                            <img src={ArrowRight} alt="right" onClick={nextPage}/>
                        </div>
                        <span>{(currentPage-1) * 10}-{currentPage * 10} of {emergenciesStats && emergenciesStats .all}</span>
                    </div>

                </main>
            </section>
            
        </div>
     );
}
 
export default DistressView;