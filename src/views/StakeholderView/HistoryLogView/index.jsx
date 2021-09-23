
import TextField from '@material-ui/core/TextField';
import SidebarView from "../SidebarView";
import Assigned from '../../../assets/assigned.svg'
import Pending from '../../../assets/pending.svg'
import Resolved from '../../../assets/resolved.svg'
import MetricCard from "../../../components/MetricCard";
import FolderIcon from '../../../assets/Folder.svg';
import LogItem from "./LogItem";
import ArrowLeft from '../../../assets/backward-arrow.svg';
import ArrowRight from '../../../assets/forward-arrow.svg';
import { useContext,useEffect, useState } from "react";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import UsersContext from '../../../store/stakeholder/users/usersContext';
import { useHistory } from 'react-router-dom'
  
  

const HistoryLogView = () => {

    //const {emergencyList,setEmergencyList} = useState([])
    //const {requestState, setRequeststate} = useState(false)
    const[progressCases, setProgressCases] = useState(0)
    const[resolvedCases, setResolvedCases] = useState(0)
    const[historyLogState, setHistoryLogState] = useState('')
    const {loadStakeholderUser, stakeholderUser} = useContext(AuthContext)
    const {getMyEmergencies, myEmergencies, getResolvedEmergencies,myResolvedEmergencies,filterEmergencies, filterResults, clearSearch, pageCount, totalCases} = useContext(UsersContext)
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)

    const [date,setDate]=useState({
        startDate:'',
        endDate:''
    })

    const handleDateChange = (e) =>{
        setDate({...date,[e.target.name]:e.target.value})
    }

    const setPagination = (e) =>{
        setCurrentPage(Number(e.target.id))
        console.log(e.target.id)
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
        getMyEmergencies(currentPage)
        getResolvedEmergencies()
        /*eslint-disable*/
    },[currentPage])


    useEffect(()=>{
        calculateProgressCases()
        calculateResolvedCases()
    },[myEmergencies])

    
    useEffect(()=>{
        setHistoryLogState(myEmergencies)
        setNoOfPages(pageCount)
      },[pageCount,myEmergencies])

    useEffect(()=>{
        setHistoryLogState(myEmergencies)
    },[myEmergencies])

    useEffect(()=>{
        if(filterResults){
            setHistoryLogState(filterResults.data)
        }else{
            setHistoryLogState(myEmergencies)
        }
    },[filterResults])

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
        console.log(resolvedCases)
    }

    const filter = () =>{
        if(date.startDate && date.endDate){
            filterEmergencies(date.startDate,date.endDate)
        }   
    }

    const clearFilter = () =>{
        clearSearch()
        setDate({
            startDate:'',
            endDate:''
        })
    }
   

 console.log(historyLogState)

    return ( 
        <div className='main'>
            <SidebarView />
            <section className='distress'>
                <header className='distress-header'>
                    <h1 className="distress-header__title"> History log</h1>
                    <div className="distress-header__metrics">
                        <MetricCard icon={Assigned} name='Total Cases' number={totalCases || 0}/>
                        {/* <MetricCard icon={CardIcon} name='Pending Cases' number='900' /> */}
                        <MetricCard icon={Pending} name='In progress' number={progressCases} />
                        <MetricCard icon={Resolved} name='Resolved Cases' number={myResolvedEmergencies.total_count || 0} />
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
                        <button className={date.startDate && date.endDate ? 'apply active' : 'apply'} onClick={filter}>Apply Filter</button>
                        <button className='clear' onClick={clearFilter}>Clear filter</button>
                    </div>
                 
                {
                    historyLogState.length ?
                    historyLogState.map(emergencies=>(
                        <LogItem 
                        key={emergencies.id}
                        EmergencyId={emergencies.id}
                        FullName={emergencies.user.firstname + ' ' + emergencies.user.lastname}
                        Phone={emergencies.user.phone}
                        Email={emergencies.user.email}
                        Location='No 10, Jordan street, Oregun...'
                        Status={emergencies.status}
                        Comment='3'
                    />
                    )):
                    <div className='no-records'>
                        <img src={FolderIcon} alt="no-records" />
                        <p>No records</p>
                        <p>You will see records when you start working on cases</p>
                    </div>
                    
                }
                     <div className='pagination'>
                        <span>{currentPage + '/' + noOfPages}</span>
                        <div className="pagination-center">
                            <img src={ArrowLeft} alt="left" onClick={previousPage}/>
                            <ul>
                                {Array.from(Array(pageCount).keys()).map((arr,index)=><li key={index} id={arr + 1} onClick={setPagination}>{arr + 1 === currentPage ? <span>{arr + 1}</span> : arr + 1}</li>)}
                            </ul>
                            <img src={ArrowRight} alt="right" onClick={nextPage}/>
                        </div>
                        <span>{(currentPage-1) * 10}-{currentPage * 10} of {totalCases}</span>
                    </div>
                </main>
            </section>
            
        </div>
     );
}
 
export default HistoryLogView;