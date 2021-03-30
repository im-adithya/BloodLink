import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../logodark.png';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-1">
                    <div className="footer-1-1">
                        <img src={logo} className="footlogo" alt="BloodLink" width='150' /><br/>
                        <div>BloodLink connects people in need with those who wish to donate for a good cause. We don't take the responsibility of transportation and storage of blood. Bloodlink is not affliated to any company or whatsoever. <br/><br/>This website is built for <span className="colorize" style={{fontWeight: 'bold'}}>Hashnode Hacks BITS Pilani.</span></div>
                        {/*<form>
                            <input type="email" placeholder="Email Address" />
                            <button type="submit">Subscribe</button>
                        </form>*/}
                    </div>
                    <div className="footer-1-2 sidefooter">
                        <h6>Navigation</h6>
                        <div><Link to="/">Home</Link></div>
                        <div><Link to="/request">Request Blood</Link></div>
                        <div><Link to="/donors">Blood Donors</Link></div>
                        <div><Link to="/feed">Live Feed</Link></div>
                    </div>
                    <div className="footer-1-3 sidefooter">
                        <h6>Developer</h6>
                        <div><a href="https://im-adithya.hashnode.dev/">Hashnode Blog</a></div>
                        <div><a href="mailto:imadithyavardhan@gmail.com">Contact Me</a></div>
                    </div>
                </div>
                <hr />
                <br/>
                <div className="footer-2">
                    <div className="footer-2-1">
                        BloodLink<br />
                        Room 2101, Gandhi Bhawan<br />
                        BITS Pilani, Pilani Campus<br />
                        Pilani, Rajasthan - 333031
                    </div>

                    <div className="footer-2-2">
                        <div>Contact me on imadithyavardhan@gmail.com</div>
                        <div style={{marginTop: '25px'}}>Find me on:</div>
                        <div className="socialicons">
                            <a href="https://www.facebook.com/im.adithya.vardhan"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                            <a href="https://www.instagram.com/the_hyperboy/"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                            <a href="https://twitter.com/the_hyperboy"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                            <a href="https://www.linkedin.com/in/adithyavardhan/"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
                            <a href="https://www.linkedin.com/in/adithyavardhan/"><FontAwesomeIcon icon={['fab', 'github']} /></a>
                        </div>
                    </div>

                    <div className="footer-2-3">
                        <div className="copyright" style={{marginTop: '25px'}}>&copy; 2021 BloodLink. All Rights Reserved.</div>
                        <div className="builtin">Built with <FontAwesomeIcon icon='heart' className="colorize"/> by Adithya Vardhan</div>
                    </div>
                </div>
            </div>
        )
    }
}