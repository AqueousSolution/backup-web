
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
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    JsonToCsv,
    useJsonToCsv
  } from 'react-json-csv';
// import {fileTitle, headers, exportCSVFile, convertToCSV} from '../../../utils/csvConverter'

  
  

const DistressView = () => {

    function convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
    
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line !== '') line += ','
    
                line += array[i][index];
            }
    
            str += line + '\r\n';
        }
    
        return str;
    }
   
    const headers = {
        file: 'File', // remove commas to avoid errors
        mediaURL: "Media URL",
        dateRecorder: "Date recorder",
        nameOfReporter: "Name of Reporter",
        lgaOfReporter: "LGA of Reporter",
        phoneNumber: 'Phone Number of Reporter',
        email: 'Email Address of Reporter',
        state: 'State of reporter',
        gps: 'GPS Location'
    };
    
    const fileTitle = 'EmergencyList';

    function exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }
    
        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);
    
        var csv = convertToCSV(jsonObject);
    
        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
    
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    
   

    //const {emergencyList,setEmergencyList} = useState([])

    const { emergenciesList, emergenciesStats, getEmergenciesStats,getCSVEmergencies, emergencyCSV, getEmergencies, pageCount, searchEmergencies, searchResults, clearSearch, filterEmergencies, filterResults, clearFilter } = useContext(EmergenciesContext)
    const {loadAdminUser, adminUser} = useContext(AuthContext)
    const history = useHistory()
    const [ emergenciesState, setEmergenciesState ] = useState(null)
    const [ stats, setStats ] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [noOfPages, setNoOfPages] = useState(1)

    const[searchQuery, setSearchQuery] = useState('')

    const formatedCSV = []

    const [date,setDate]=useState({
        startDate:'2021-07-01',
        endDate:''
    })

    const filename = 'BackUp Emergencies'

    const fields = {
      "id": "ID",
    }

   const data = [
      { index: 0, guid: 'asdf231234'},
      { index: 1, guid: 'wetr2343af'}
    ]

   const { saveAsCsv } = useJsonToCsv();

   const download = () =>{
       let e = emergencyCSV.map(item => item.user)
       console.log(e)
    saveAsCsv({ e, fields, filename })
   }

    const handleDateChange = (e) =>{
        setDate({...date,[e.target.name]:e.target.value})
    }

    const handleSearch = (e) =>{
       setSearchQuery(e.target.value)
    }

    const setPagination = (e) =>{
        setCurrentPage(Number(e.target.id))
        console.log(e.target.id)
    }

   const nextPage = () =>{
        if(currentPage < noOfPages){
        setCurrentPage(currentPage)
       } 
   }

   const previousPage = () =>{
       if(currentPage > 1){
        setCurrentPage(currentPage - 1)
       }
    }

    const applyFilter = () =>{
        if(date.startDate && date.endDate){
            message.success('Emergencies are now being filtered')
            filterEmergencies(date.startDate,date.endDate)
        }else{
            message.error('Please put in both a start date and end date to filter')
        }   
    }

    const clear = () =>{
        clearFilter()
    }

    const downloadCSV = () =>{
        exportCSVFile(headers, formatedCSV, fileTitle)
        console.log('downloaded')
    }



    //console.log(formatedCSV)

    const arrangeCSVItems = () =>{
        emergencyCSV.forEach((item) => {
            formatedCSV.push({
                file: 'File', // remove commas to avoid errors
                mediaURL: item.user.created_date,
                dateRecorder: item.user.created_date,
                nameOfReporter: item.user.firstname + ' ' + item.user.lastname,
                lgaOfReporter: item.user.profile.lga.name,
                phoneNumber: item.user.phone,
                email: item.user.email,
                state: item.user.profile.state.name,
                gps: 'GPS Location'
            });
        });
    }
   

    useEffect(()=>{
        loadAdminUser()
        getCSVEmergencies()
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

    useEffect(()=>{
      if(emergencyCSV){
          arrangeCSVItems()
      }
    },[emergencyCSV])
    console.log(emergencyCSV)

    return ( 
        <div className='main'>
            <SidebarView />
            <section className='distress'>
                <header className='distress-header'>
                    <div className='distress-header_top'>

                    <h1 className="distress-header__title">Distress calls</h1>

                    {
                        adminUser && adminUser.user_type==='super-admin'?
                        <button className='btn-two' onClick={downloadCSV}>Download all Cases</button>
                        :''
                    }
                    </div>
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
                        <button className={date.startDate && date.endDate ? 'apply active' : 'apply'} onClick={applyFilter}>Apply Filter</button>
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
                                {Array.from(Array(pageCount).keys()).map((arr,index)=><li key={index} id={arr + 1} onClick={setPagination}>{arr + 1 === currentPage ? <span>{arr + 1}</span> : arr + 1}</li>)}
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