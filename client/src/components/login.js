import React, { Component } from 'react';
import Switch from "react-switch";
import Autocomplete from 'react-google-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginBG } from "./home"

import axios from 'axios';
import './login.css';
import logo from '../logowhite.png';

const TextBox = () => {
  return (
    <div className="textbox">
      <img src={logo} alt="BloodLink" width='300' />
      <br /><br />
      <div className="textboxwrapper">
        <h1>Hello there!</h1>
        <p className="subtitle">Login to Request and Receive Blood.</p>
        <p>Donate Blood Because You Can Be The Next One To Need It.</p>
      </div>
    </div>
  )
}

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePhoneAgain = this.onChangePhoneAgain.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeBG = this.onChangeBG.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.onSubmitforOTP = this.onSubmitforOTP.bind(this);
    this.onSubmitConfirm = this.onSubmitConfirm.bind(this);
    this.onSubmitFinal = this.onSubmitFinal.bind(this);
    this.pageDec = this.pageDec.bind(this)
    this.pageInc = this.pageInc.bind(this)

    this.state = {
      phone: '',
      phoneAgain: '',
      name: '',
      email: '',
      age: '',
      gender: '',
      bloodgroup: '',
      address: '',
      pos: '',
      posavailable: false,
      warningone: '',
      warningtwo: '',
      warningthree: '',
      existinguser: false,
      existinguserdata: '',
      currpage: 1,
    }
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  onChangePhoneAgain(e) {
    this.setState({
      phoneAgain: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  }

  onChangeBG(e) {
    this.setState({
      bloodgroup: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  setCurrentLocation() {
    if (!this.state.posavailable && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          pos: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          posavailable: true
        });
      });
    } else {
      this.setState({ posavailable: false, pos: '' })
    }
  }

  pageInc() {
    this.setState(prevState => {
      return {
        currpage: prevState.currpage + 1
      }
    })
  }

  pageDec() {
    this.setState(prevState => {
      return {
        currpage: prevState.currpage - 1
      }
    })
  }

  onSubmitforOTP(e) {
    e.preventDefault();

    axios.get('/api/user/' + this.state.phone)
      .then(res => {
        if (res.data !== null) {
          this.setState({ existinguser: true, existinguserdata: res.data, currpage: 4 })
          this.props.addUser(this.state.existinguserdata)
        } else {
          this.pageInc()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  onSubmitConfirm(e) {
    e.preventDefault();
    if (this.state.phone === this.state.phoneAgain) {
      this.setState({ warningtwo: '' })
      if (this.state.existinguser) {
        this.props.addUser(this.state.existinguserdata)
        this.setState({ currpage: 4 })
      } else {
        this.pageInc()
      }
    } else {
      this.setState({warningtwo: "The phone numbers don't match"})
    }
  }

  onSubmitFinal(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      age: this.state.age,
      gender: this.state.gender,
      bloodgroup: this.state.bloodgroup,
      address: this.state.address,
      pos: this.state.pos,
    }

    if (typeof (this.state.pos) !== 'object') {
      this.setState({ warningthree: 'Please allow access to your location' })
      return
    }

    axios.post('/api/user/add', user)
      .then(res => {
        this.setState({ warningthree: '' })
        this.props.addUser(res.data)
        this.pageInc()
        axios.post('/api/blood/add', { user: res.data })
          .then(res => {
            console.log('Added as Donor!')
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        this.setState({ warningthree: 'Please complete all fields' })
        console.log(err, this.state)
      });
  }

  render() {
    let formClass = ["formbox"]
    let successClass = ["formbox", "nodisp"]
    let backStyling = { display: 'block' }
    let progStyling = { width: 33.33 * (this.state.currpage - 1).toString() + '%' }
    switch (this.state.currpage) {
      case 1:
        formClass.push('loginpageone')
        backStyling.display = 'none'
        break;

      case 2:
        //        formClass.push('loginpagetwo')
        formClass.push('loginpagetwo')
        break;

      case 3:
        formClass.push('loginpagethree')
        break;

      case 4:
        formClass.push('nodisp')
        successClass.splice(1, 1);
        successClass.push('success')
        backStyling.display = 'none'
        break;

      default:
        break;
    }
    return (
      <div className="loginbox">

        <div className="progstep">
          <div className="progressbar" style={progStyling}></div>
        </div>
        <p id="back" onClick={this.pageDec} style={backStyling}><i className="arrow left"></i></p>

        <form id="form1" className={formClass.join(' ')} onSubmit={this.onSubmitforOTP}>
          <h3>Login or Signup</h3>
          <div>
            <label htmlFor="phone">10-Digit Mobile Number</label>
            <input type="tel" value='+91' style={{ width: '25px' }} disabled />
            <input
              type="tel"
              placeholder="Mobile Number"
              style={{ width: '144px' }}
              pattern="[1-9]{1}[0-9]{9}"
              name="phone"
              id="phone"
              onInput={this.handleInput}
              onChange={this.onChangePhone}
              required />
          </div><br />
          <p className="msgs">{this.state.warningone}</p>
          <div className="btnbox">
            <button type="submit" id="next1" className="loginbutton">{/*Get OTP*/}Next</button>
          </div>
        </form>

        <form id="form2" className={formClass.join(' ')} onSubmit={this.onSubmitConfirm} autoComplete="off">
          <h3>Login or Signup</h3>
          <div>
            <label>Confirm your phone number</label><br/>
            <input type="tel" value='+91' style={{ width: '25px' }} disabled />
            <input
              type="tel"
              id="phnlock"
              style={{ width: '144px' }}
              value={this.state.phone}
              disabled />
          </div>
          <div>
            <input type="tel" value='+91' style={{ width: '25px' }} disabled />
            <input
              type="tel"
              placeholder="Mobile Number"
              style={{ width: '144px' }}
              pattern="[1-9]{1}[0-9]{9}"
              name="phone"
              id="phone"
              onChange={this.onChangePhoneAgain}
              required />
          </div><br />
          <p style={{textAlign: 'center'}}>Please cross check your number again as it is the only medium of contact.</p>
          <p className="msgs">{this.state.warningtwo}</p>
          <div className="btnbox">
            <button type="submit" id="next2" className="loginbutton">Submit</button>
          </div>
        </form>

        <form id="form3" className={formClass.join(' ')} onSubmit={this.onSubmitFinal}>
          <h3>Fill your Details</h3>
          <div className="details">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={this.onChangeName} required /><br />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={this.onChangeEmail} required /><br />
            <label htmlFor="age">Age</label>
            <input type="number" min="18" name="age" id="age" onChange={this.onChangeAge} required /><br />
            <label htmlFor="address">Address</label>
            <Autocomplete
              id="address" name="address" onChange={this.onChangeAddress}
              apiKey={'AIzaSyBlUmInDBrZR37g8i33_JJMYs9-68oSHOs'/*AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us*/}
              onPlaceSelected={(place) => this.setState({ address: place.formatted_address })}
              types={['(cities)']}
              componentRestrictions={{ country: "in" }}
              required
            />
            <div className="currloc">
              <label htmlFor="address">Set Current Location <span className="colorize">(Required)</span></label>
              <Switch onChange={this.setCurrentLocation} checked={this.state.posavailable} uncheckedIcon={false} onColor='#b21e2e' offColor='#bcbcbc' handleDiameter={16} boxShadow='0 0 2px 1px #a7a7a7' activeBoxShadow='0 0 2px 1px #b21e2e' width={30} height={15} checkedIcon={false} />
              {/*<div onClick={this.setCurrentLocation} className="clickable"><FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ color: 'white' }} /></div>*/}
            </div>
          </div>
          <label htmlFor="name" style={{ fontSize: '12px', marginBottom: '0.5rem' }}>Gender</label>
          <div className="radiobtn">
            <input type="radio" id="male" name="gender" value="male" onChange={this.onChangeGender} required />
            <label htmlFor="male">Male</label><br />
            <input type="radio" id="female" name="gender" value="female" onChange={this.onChangeGender} required />
            <label htmlFor="female">Female</label><br />
            <input type="radio" id="other" name="gender" value="other" onChange={this.onChangeGender} required />
            <label htmlFor="other">Other</label>
          </div>
          <div className="selection">
            <label htmlFor="bloodgroup">Blood Group</label>
            <select name="bloodgroup" id="bloodgroup" onChange={this.onChangeBG} required>
              <option value="" defaultValue hidden>--</option>
              <option value="A-">A-</option>
              <option value="A+">A+</option>
              <option value="B-">B-</option>
              <option value="B+">B+</option>
              <option value="AB-">AB-</option>
              <option value="AB+">AB+</option>
              <option value="O-">O-</option>
              <option value="O+">O+</option>
            </select>
          </div>
          <div className="checkboxes">
            <input type="checkbox" id="tnc" name="tnc" value="tnc" required />
            <label htmlFor="tnc" className="tnc"> I agree to the Terms and Conditions</label><br />
          </div>
          <p className="msgs" style={{ display: this.state.warningthree === "" ? 'none' : 'block' }}>{this.state.warningthree}</p>
          <div className="btnbox">
            <button type="submit" id="next3" className="loginbutton">Submit</button>
          </div>
        </form>

        <div id="success" style={{ display: 'flex' }}>
          <Link to="/"><div className="skipcross" style={{ display: this.state.currpage === 4 ? 'block' : 'none' }}><FontAwesomeIcon icon='times' /></div></Link>
          <div className={successClass.join(' ')} style={{ textAlign: 'center' }}>
            <h3>{this.state.existinguser ? 'Login successful!' : 'Congratulations!'}</h3>
            <p style={{ fontSize: '15px' }}>{this.state.existinguser ? '' : 'Your account has been created.'}</p><br />
            <div className="btnbox">
              <button type="button" id="actlog" className="loginbutton"><Link to="/request" style={{ fontSize: '12px', color: 'white' }}>Request Blood</Link></button>
              <button type="button" id="reqblood" className="loginbutton"
                style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}><Link to="/feed" style={{ fontSize: '12px', color: 'black' }}>Live Feed</Link></button>
            </div><br />
            <p style={{ fontSize: '12px', cursor: 'pointer' }} id="skip"><Link to="/" style={{ fontSize: '12px', color: 'black' }}>Skip</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

class Login extends Component {
  render() {
    return (
      <div>
        <div className="blur">
          <LoginBG />
        </div>
        <div className="logincontainer">
          <TextBox />
          <LoginBox addUser={this.props.addUser} auth={this.props.auth} details={this.props.user} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => { dispatch({ type: 'AUTHENTICATE_USER', userdata: user }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)