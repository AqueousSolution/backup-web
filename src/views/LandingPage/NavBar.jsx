import React,{ useEffect, useState } from 'react'
import Logo from '../../assets/logo-white.svg'
import LogoColored from '../../assets/logo.svg'

const NavBar = ({scrollToFeatures, scrollToHowItWorks, scrollToContact}) => {

    const [top, setTop] = useState(true);

    useEffect(()=>{
        document.addEventListener('scroll', () => {
          const isTopScrolled = window.scrollY < 120;
          if (isTopScrolled !== top) {
            setTop(isTopScrolled);
          }
        });
    
        return()=>{
          document.removeEventListener('scroll', () => {
            const isTopScrolled = window.scrollY < 120;
            if (isTopScrolled !== top) {
              setTop(isTopScrolled);
            }
          });
        }
      },[top])

    return ( 
        <nav className={top ? 'navbar' : 'navbar white-bg'}>
             <img src={top ? Logo : LogoColored} alt="logo" /> 

            <ul>
                <li onClick={scrollToFeatures}>Features</li>
                <li  onClick={scrollToHowItWorks}>How it Works</li>
                <li onClick={scrollToContact}>Contact</li>
            </ul>

        </nav>
     );
}
 
export default NavBar;