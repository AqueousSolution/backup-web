import SidebarView from "../SidebarView";
import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import Map from "./Map";
import MetricCard from '../../components/MetricCard'
import Assigned from '../../assets/assigned.svg'
import Pending from '../../assets/pending.svg'
import Resolved from '../../assets/resolved.svg'


const StakeholdersView = () => {
    return ( 
        <div className='main'>
            <SidebarView />
            <section className='stakeholders'>
                <header className="stakeholders-header">
                    <h1>Stakeholders</h1>
                    <div className="metrics">
                        <MetricCard icon={Assigned} number='20' name='Assigned Cases'/>
                        <MetricCard icon={Pending} number='2' name='Pending Cases'/>
                        <MetricCard icon={Resolved} number='18' name='Resolved Cases'/>
                    </div>
                </header>
                <div className="stakeholders-contacts">
                    <ContactList />
                    <ContactInfo />
                    <Map />
                </div>
            </section>
            
        </div>
     );
}
 
export default StakeholdersView;