import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,faTwitter,faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import logo from '../../images/banner.jpeg';

const Footer = () => {
    return (
        <div className="footer-container">
        <section id="foot" class="big-footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="foot-main-common">
                        <div class="foot-common-head">
                            <h3>Welcome</h3>
                        </div>
                        <div class="foot-common-content">
                            <p>Blog Site.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="foot-main-common">
                        <div class="foot-common-head">
                            <h3>Stay Connected</h3>
                        </div>
                        <div class="foot-icon">
                            <ul>
                                <li><FontAwesomeIcon icon={faFacebookF} /></li>
                                <li><FontAwesomeIcon icon={faTwitter} /></li>
                                <li><FontAwesomeIcon icon={faLinkedinIn} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="foot-main-common">
                        <div class="foot-common-head">
                            <h3>Blogger</h3>
                        </div>
                        <div class="foot-common-content">
                            <img style={{height:'80px', width:'120px', zIndex:'1', border:'2px solid white'}} src={logo} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer id="Footer">
       <div class="container">
           <div class="row">
               <div class="col-md-12 text-center">
                   <div class="foot-con">
                       <p class="head">Copyright &copy; 2021 Blogger.</p>
                       <p class="head">All Rights Reserved
                           <span class="one"> Made with &#10084;&#65039; by Timittra Islam Hridi</span></p>
                   </div>
              </div>
           </div>
       </div>
   </footer>
    </div>
    );
};

export default Footer;