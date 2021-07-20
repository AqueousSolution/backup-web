import ContactList from "./ContactList";
import ContactInfo from "./ContactInfo";
import SidebarView from "../SidebarView";
import Map from "./Map";

const DashboardView = () => {
    return ( 
        <div className='main'>
            <SidebarView />
            <section className='dashboard'>
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                </header>
                <div className="dashboard-contacts">
                    <ContactList />
                    <ContactInfo />
                    <Map />
                </div>
            </section>
            
        </div>
     );
}
 
export default DashboardView;