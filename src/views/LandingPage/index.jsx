import React, { useRef } from 'react'
import HeroImage from '../../assets/hero-image.png'
import EmergencyContacts from '../../assets/emergency-contacts.png'
import FeatureImage1 from '../../assets/features11.png'
import FeatureImage2 from '../../assets/features2.png'
import FeatureImage3 from '../../assets/features3.png'
import Doctor from '../../assets/doctors.svg'
import Doc from '../../assets/doc.svg'
import Lawyer from '../../assets/lawyer.svg'
import HowItWorks1 from '../../assets/how-it-works1.svg'
import HowItWorks2 from '../../assets/how-it-works2.svg'
import HowItWorks3 from '../../assets/how-it-works3.svg'
import FooterImage from '../../assets/footerImg.svg'
import GooglePlay from '../../assets/google-play.svg'
import AppleStore from '../../assets/app-store.svg'
import { NavLink as Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar.jsx';

const LandingPage = () =>{

    const history = useHistory()

    const footerRef = useRef(null)

    const howItWorksRef = useRef(null)

    const contactUsRef = useRef(null)

    const featuresRef = useRef(null)

    const signUpStakeholder = () =>{
        history.push('/stakeholder/register')
    }

    const scrollToFooter = () =>{
        footerRef.current.scrollIntoView({behaviour: 'smooth'})
    }

    const scrollToHowItWorks = () =>{
        howItWorksRef.current.scrollIntoView({behaviour: 'smooth'})
    }

    const scrollToFeatures = () =>{
        featuresRef.current.scrollIntoView({behaviour: 'smooth'})
    }

    const scrollToContact = () =>{
        contactUsRef.current.scrollIntoView({behaviour: 'smooth'})
    }

    return(
        <>
            <NavBar scrollToFeatures={scrollToFeatures} scrollToHowItWorks={scrollToHowItWorks} scrollToContact={scrollToContact}/>
            <div className='landingPage'>
                <section className='landingPage-hero'>
                    <div className='landingPage-hero__left'>
                        <h1>Report harassment in real time</h1>
                        <p>BackUp helps you report harassment by law enforcement agencies in a click.</p>
                        <button onClick={scrollToFooter}> Get Started</button>
                    </div>
                    <div className='landingPage-hero__right'>
                        <img src={HeroImage} alt="backup display" />
                    </div>
                </section>

                <section className='landingPage-Econtacts'>
                    <div className="landingPage-Econtacts__left">
                        <img src={EmergencyContacts} alt="emergency contacts" />
                    </div>
                    <div className="landingPage-Econtacts__right">
                        <h5>FEATURES</h5>
                        <h1>Add friends as emergency contacts</h1>
                        <ul>
                            <li>Add your close friends and loved ones to receive immediate alerts anytime you are about to get harrassed.</li>
                            <li>Broadcast your realtime location to them. If they cannot call you immediately, they would have information of your realtime location</li>
                            <li>Sends short video clips for evidence against brutality. The law may not believe word of mouth, but evidence always wins the case.</li>
                        </ul>
                    </div>
                </section>

                <section className='landingPage-features' ref={featuresRef}>
                    <h1>Features</h1>

                    <div className="landingPage-features__list">
                        <div className='feature'>
                            <h2>Report violations on behalf of a victim</h2>
                            <p>Witnessing a person being harassed? Report violations on their behalf. </p>
                            <img src={FeatureImage1} alt="feature" />
                        </div>

                        <div className='feature'>
                            <h2>Alert friends on social media </h2>
                            <p>Prompt friends on social media in the event of an attack.</p>
                            <img src={FeatureImage2} alt="feature" />
                        </div>

                        <div className='feature'>
                            <h2>Make toll free calls to report harassment </h2>
                            <p>Make toll free calls for immediate response in the case of an emergency. </p>
                            <img src={FeatureImage3} alt="feature" />
                        </div>
                    </div>
                
                </section>

                <section className='landingPage-stakeholders'>
                    <div className="landingPage-stakeholders__left">
                        <h1>For Stakeholders</h1>
                        <p>Are you a stakeholder looking to make a difference in the community or country?</p>

                        <div className='stakeholder-example'>
                            <img src={Doc} alt="doc" />
                            <p> <span> Doctors </span>- Volunteer some time to give first aid advice and assistance to victims of police brutality.</p>
                        </div>

                        <div className='stakeholder-example'> 
                            <img src={Lawyer} alt="lawyer" />
                            <p> <span> Lawyers </span>- Volunteer for pro-bono services of victims of police brutality who have been detained unjustly. </p>
                        </div>

                        <button className='btn-two' onClick={signUpStakeholder}>Sign up as a Stakeholder</button>
                    </div>

                    <div className="landingPage-stakeholders__right">
                        <img src={Doctor} alt="doctor" />
                    </div>
                
                </section>

                <section className='landingPage-howItWorks' ref={howItWorksRef}>
                    <h1>How it works</h1>
                    <p className='landingPage-howItWorks__subtitle'>You can use the Backup app in three simple steps</p>

                    <div className="landingPage-howItWorks__cards">
                        <div className="howItWorks-card">
                            <img src={HowItWorks1} alt="how-it-works" />
                            <h3>Create an account</h3>
                            <p>Sign up with your name, email, phone number, Twitter account and add up to 3 emergency contacts.</p>
                        </div>

                        <div className="howItWorks-card">
                            <img src={HowItWorks2} alt="how-it-works" />
                            <h3>Report in real time</h3>
                            <p>In the event of any harassment, tap the emergency button to report.</p>
                        </div>

                        <div className="howItWorks-card">
                            <img src={HowItWorks3} alt="how-it-works" />
                            <h3>Get Help</h3>
                            <p>Your live location is automatically shared with emergency contacts, human rights organizations,and on social media.</p>
                        </div>
                    </div>
                </section>
{/* 
                <section className="landingPage-contact" ref={contactUsRef}>
                    <h2>Contact Us</h2>
                    <p>thebackupplatform@gmail.com</p>
                </section> */}

                <footer ref={footerRef} className="landingPage-footer">
                    <div className="landingPage-footer__top">
                        <img src={FooterImage} className='footer-image' alt="footer-img" />
                        <div className='copy'>
                            <h4>AVAILABLE NOW</h4>
                            <h3>The Backup App</h3>
                            <p>Start and manage campaigns, engage with supporters, and discover important causes — all on the go</p>
                            <span>
                                <img src={AppleStore} alt="app-store" />
                                <img src={GooglePlay} alt="play-store" />
                            </span>
                        </div>
                    </div>

                    <div className="landingPage-footer__bottom">
                        <div ref={contactUsRef}>
                             <p>© The Backup App 2020. All Rights Reserved.</p>
                             <br />
                             <h4>Contact Us</h4>
                             <p>The CANs Park, Maitama Amusement Park, Abuja</p>
                             <p>+234 (0) 832963317</p>
                             <p> hello@thecans.ng.</p>
                        </div>
                        
                        <div>
                            <p>Terms and Conditions <span></span></p>
                            <Link to='/policy'>Privacy Policy </Link>
                        </div>
                       
                        
                    </div>
                </footer>
            </div>
        </>
    )
}

export default LandingPage