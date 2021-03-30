import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap'
import './navbar.css';
import logo from '../logodark.png';
import logowhite from '../logowhite.png';
import male from '../assets/male-user.png';
import female from '../assets/female-user.png';

const Navigationbar = withRouter(props => <NavBar {...props} />);

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      slideSet: false,
      lastScrollY: 0,
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;


    if (currentScrollY > lastScrollY) {
      this.setState({ slideSet: true });
    } else {
      this.setState({ slideSet: false });
    }
    this.setState({ lastScrollY: currentScrollY });
  };

  render() {
    return (
      <Navbar expand="lg" expanded="true" className={this.state.slideSet ? 'navscr' : ''}>
        <Navbar.Brand>
          <Link to="/">
            <img src={(this.props.location.pathname === '/') ? logo : logowhite} className="navlogo" alt="BloodLink" width='200' />
          </Link>
          <Link to={this.props.auth ? "/profile" : "/login"} className="navlinks ml-auto userlink" style={{ color: '#b21e2e' }}>
            <img src={this.props.auth ? (this.props.user.gender === "male" ? male : female) : "https://www.vhv.rs/dpng/d/408-4087421_person-svg-circle-icon-picture-charing-cross-tube.png"} alt="user" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid ' + ((this.props.location.pathname === '/profile') ? '#b21e2e' : '#ff929e') }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <Link to="/request" className={'navlinks botnav' + ((this.props.location.pathname === '/request') ? ' activelink' : '')}>
              Request Blood
            </Link>
            <Link to="/donors" className={'navlinks botnav' + ((this.props.location.pathname === '/donors') ? ' activelink' : '')}>
              Blood Donors
            </Link>
            <Link to="/feed" className={'navlinks botnav' + ((this.props.location.pathname === '/feed') ? ' activelink' : '')}>
              Live Feed
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    requested: state.requested
  }
}

export default connect(mapStateToProps)(Navigationbar)