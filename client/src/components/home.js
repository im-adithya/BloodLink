import React, { Component } from 'react';
import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css";
import { connect } from 'react-redux';

import { Redirect, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './home.css';
import arrow from '../arrow.png'
import home1 from '../assets/home-1.png'
import home1o1 from '../assets/home-1-1.png'
import home3 from '../assets/home-3.png'
import home4 from '../assets/home-4.png'
import home5 from '../assets/home-5.png'
import home6 from '../assets/home-6.png'
import home7 from '../assets/home-7.png'
import home8 from '../assets/home-8.png'
import home11 from '../assets/home-11.png'

const PageOne = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <div
                        className="w-100 fullheight pg1"
                        style={{ backgroundImage: `url(${home1})` }}
                    >
                        <h1>Welcome to<br /> BloodLink</h1><br />
                        <p>Connecting Blood donors <br />had never been much easier!</p><br />
                        <button className="button1"><Link to='/donors'>Find Blood</Link></button>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        className="w-100 fullheight pg1-1"
                        style={{ backgroundImage: `url(${home1o1})` }}
                    >
                        <h1>Wish to Donate?</h1><br />
                        <p>Register and head to the<br/> Live Feed section right now!</p><br />
                        <button className="button1"><Link to='/feed'>Live Feed</Link></button>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        className="w-100 fullheight pg1-2"
                        style={{ backgroundImage: `url(${home1o1})` }}
                    >
                        <h1>In need of Blood?</h1><br />
                        <p>Raise a Request to contact<br />our Donors!</p><br />
                        <button className="button1"><Link to='/request'>Request Blood</Link></button>
                    </div>
                </Carousel.Item>
            </Carousel >
            <div className="chevron"></div>
            <div className="chevron"></div>
            <div className="chevron"></div>
        </div>
    )
}

const PageTwo = () => {
    return (
        <div
            className="d-block w-100 fullheight pg2"
            style={{ backgroundColor: 'lightpink'}}
        >
            <h3>According to WHO</h3><br />
            <h1>"India runs short of <span className="emphasize">2,000,000</span> units of blood every year."</h1><br />
            <p>Every two seconds someone needs blood. More than 38,000 blood donations are needed every day.</p><br />
            <button className="button1"><Link to='/feed'>Donate Blood</Link></button>
        </div>
    )
}

const PageThree = () => {
    return (
        <div
            className="d-block w-100 fullheight pg3"
        >
            <h2>What Does <span className="emphasize">BloodLink</span> Do?</h2>
            <br />
            <p>We Connect Blood Donors with the people who are
                in need of blood anytime, anywhere!<br />
                Go to Live-Feed to donate blood<br/>
                or Blood-Donors to contact the available donors!<br />
            </p>
            <br />
            <Link to="/request">Be sure to <span style={{ fontSize: '20px', color: '#b21e2e' }}>Raise a Request</span> before contacting blood donors!</Link>
        </div>
    )
}

const PageFour = () => {
    return (
        <div className="fullheight pg4" data-aos="fade-up">
            <div>
                <div className="pg4text">
                    <h2>Become a Donor</h2>
                    <h4>REGISTER YOURSELF A DONOR<br />AND HELP THE SOCIETY</h4>
                    <button className="button1"><Link to='/feed'>Live Feed</Link></button>
                </div>
                <div className="pg4img">
                    <img src={home4} alt='donate' />
                </div>
            </div>
            <div>
                <div className="pg4text">
                    <h2>Request Blood</h2>
                    <h4>NEED BLOOD FOR YOURSELF <br />OR SOMEONE YOU KNOW?</h4>
                    <button className="button1" ><Link to='/request'>Find Blood</Link></button>
                </div>
                <div className="pg4img">
                    <img src={home3} alt='request' />
                </div>
            </div>
        </div>
    )
}

class PageFive extends Component {
    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this)

        this.state = {
            worksfor: 'requests'
        }
    }
    changeState(e) {
        this.setState({ worksfor: e.target.value })
    }

    render() {
        let steps = (this.state.worksfor === 'donors') ?
            ['Complete your profile and start getting requests.', 'Contact the blood receiver you want to help.', 'Go to your nearest hospital to donate blood.'] :
            ['Raise a Blood request by filling up the form.', 'Search from the list of Blood Donors in your location.', 'Connect & get blood near your hospital.']

        let buttonClass = ['disabledbutton', 'activebutton']

        if (this.state.worksfor === 'requests') {
            buttonClass = ['activebutton', 'disabledbutton']
        }

        return (
            <div className="fullheight pg5">
                <div className="pg5-1wrapper">
                    <h1 style={{ color: 'white' }}>How It Works?</h1>
                    <br />
                    <button onClick={this.changeState} className={buttonClass[0] + ' button2'} value='requests'>For Blood Requests</button>
                    <button onClick={this.changeState} className={buttonClass[1] + ' button2'} value='donors'>For Blood Donors</button>
                </div>
                <div className="pg5-2wrapper" data-aos="fade-up">
                    {steps.map((info, index) => (
                        <div className='stepbox lift' key={'step' + (index + 1).toString()}>
                            <div className='stepbox-header'>
                                <span>STEP {index + 1}</span>
                                <img src={arrow} alt='arrow' width='70px' height='10px' style={{ marginTop: '10px' }} />
                            </div>
                            <p>{info}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const PageSix = () => {
    let reasons = ['No Fees or Commission', 'Live Updates', 'Contact Blood Donors Directly', 'Time Saving', 'Map View', 'And many more...']
    return (
        <div className="fullheight pg6">
            <h1>Why BloodLink?</h1>
            <div className="pg6wrapper">
                {reasons.map((reason, index) => (
                    <div className="reason" key={'reason' + (index + 1).toString()} data-aos='fade-up'>
                        <h3 className="reason-num">{index + 1}</h3>
                        <div className="reason-title">{reason}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

class PageSeven extends Component {
    constructor(props) {
        super(props);
        this.getTestimonials = this.getTestimonials.bind(this)

        this.state = {
            testimonials: [{ name: 'Neha Singh', feedback: "I am really thankful to BloodLink for connecting us with Ajay (Blood donor), who saved our child life being an stranger" },
            { name: 'Ankush Sharma', feedback: "Can't thank BloodLink enough for saving my life! Gave blood in the right time." },
            { name: 'Bhanu Kumar', feedback: "Thank you for saving my child's life! BloodLink is the best. Thank you very much!!" }],
        }
    }

    getTestimonials() { /*TODO: USE COMPONENT DID MOUNT HERE */
        axios.get('/api/user/testimonials')
            .then(res => {
                this.setState({ testimonials: res })
            })
            .catch(err => { console.log(err) });
    }

    render() {
        return (
            <div
                className="fullheight pg7"
                style={{ backgroundImage: "linear-gradient(#FDEAEA,#FDEAEA)" }}
            >
                <h1>What People Say!</h1>
                <Carousel className="pg7wrapper" indicators={false}>
                    {this.state.testimonials.map((user, index) => (
                        <Carousel.Item interval={1200} key={'testimonial' + (index + 1).toString()}>
                            <div className="testimonial">
                                <h3 className="testimonial-name">{user.name}</h3>
                                <p className="testimonial-feedback">{user.feedback}</p>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
}

const PageEight = () => {
    return (
        <div className="fullheight pg9 ">
            <h1>Make A Difference</h1>
            <p>with BloodLink</p>
            <div className="pg9wrapper">
                <div className="pg9-1">
                    <div data-aos="fade-up"
                        data-aos-duration="150"
                        data-aos-delay="100"
                        className="pg9-1-1"
                        style={{ backgroundImage: `url(${home5})` }}
                    />
                    <div className="pg9-1-1"
                        style={{ backgroundColor: '#FAD0D2' }}
                        data-aos="fade-down"
                        data-aos-duration="300"
                        data-aos-delay="250"
                    >
                        <h3>Host A Blood Camp</h3>
                        <p>Host a blood camp within your community<br/> using our website to collect and store data.</p>
                    </div>
                </div>
                <div className="pg9-2">
                    <div className="pg9-1-2"
                        style={{ backgroundColor: '#D6ECD9' }}
                        data-aos="fade-left"
                        data-aos-duration="300"
                        data-aos-delay="175"
                    >
                        <h3>Donate blood with us</h3>
                        <p>Give blood to the needy and help the society</p>
                    </div>
                    <div
                        className="pg9-1-2 pg9-1-img pg9adjust"
                        style={{ backgroundImage: `url(${home8})` }}
                        data-aos="fade-right"
                        data-aos-duration="75"
                        data-aos-delay="100"
                    >
                    </div>
                    <div
                        className="pg9-1-2"
                        style={{ backgroundImage: `url(${home7})` }}
                        data-aos="fade-left"
                        data-aos-duration="75"
                        data-aos-delay="100"
                    >
                    </div>
                    <div className="pg9-1-2"
                        style={{ backgroundColor: '#E3D1E6' }}
                        data-aos="fade-right"
                        data-aos-duration="300"
                        data-aos-delay="175"
                    >
                        <h3>Share this with your friends!</h3>
                        <p>Other ways you can help us is by increasing our reach!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PageNine = () => {
    return (
        <div className="w-100 pg12bgparent fullheight">
            <div className="pg12wrapper">
                <h1 style={{ textAlign: 'center', fontSize: '66px', fontWeight: 'bold', color: 'white', marginBottom: '50px' }}>There is no alternative<br /> to human blood.</h1>
                <button className="button1 heartwrap"><Link to='/feed'>Donate Now &nbsp; <FontAwesomeIcon icon='heart' className="heart" /></Link></button>
            </div>
            <div className="pg12 pg12bg" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url(${home11})` }}></div>
        </div>
    )
}

export const LoginBG = class HomeWrapper extends Component {
    componentDidMount() {
        AOS.init({
            duration: 1000
        });
    }

    render() {
        return (
            <div className="home container">
                <PageOne />
                <PageTwo />
                <PageThree />
                <PageFour />
                <PageFive />
                <PageSix />
                <PageSeven />
                <PageEight />
                <PageNine />
            </div>
        )
    }
}

class Home extends Component {
    render() {
        return (
            this.props.auth ? <LoginBG /> : <Redirect to={{ pathname: '/login', state: { from: "home" } }} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Home)