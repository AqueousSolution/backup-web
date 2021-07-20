import SidebarView from "../SidebarView";
import MetricCard from "../../components/MetricCard";
import CardIcon from '../../assets/metric-img.svg';
import LogItem from "./LogItem";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import { useState } from "react";
  
  

const DistressView = () => {

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
                        <MetricCard icon={CardIcon} name='Total Cases' number='14'/>
                        <MetricCard icon={CardIcon} name='Pending Cases' number='900' />
                        <MetricCard icon={CardIcon} name='In progress' number='03' />
                        <MetricCard icon={CardIcon} name='Resolved Cases' number='03' />
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
                    <LogItem 
                        FullName='John Doe'
                        Phone='08167222126'
                        Email='Josephbadru@gmail.com'
                        Location='No 10, Jordan street, Oregun...'
                        Status='Pending'
                        Comment='3'
                    />
                    <LogItem 
                        FullName='John Doe'
                        Phone='08167222126'
                        Email='Josephbadru@gmail.com'
                        Location='No 10, Jordan street, Oregun...'
                        Status='Pending'
                        Comment='3'
                    />
                    <LogItem 
                        FullName='John Doe'
                        Phone='08167222126'
                        Email='Josephbadru@gmail.com'
                        Location='No 10, Jordan street, Oregun...'
                        Status='Pending'
                        Comment='3'
                    />
                </main>
            </section>
            
        </div>
     );
}
 
export default DistressView;