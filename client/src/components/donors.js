import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { Redirect } from 'react-router-dom';
import AOS from 'aos';
//import CountUp from 'react-countup';


import Autocomplete from 'react-google-autocomplete';
import './donors.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistance } from 'geolib';
import MapView from './map/mapview'
import male from '../assets/male-user.png';
import female from '../assets/female-user.png';
import { WhatsappIcon } from "react-share";



export const ListView = class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageCount: 1
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({ pageCount: selected + 1 });
        window.scrollTo(0, 350);
    };

    render() {
        return (
            <div className="listviewwrapper">
                {this.props.data.length > 0 && <div className="listviewwrap">
                    {this.props.data.map((info, index) => {
                        if ((index < this.state.pageCount * 12) && (index >= (this.state.pageCount - 1) * 12)) {
                            return (<div className='listitem' key={"listitem-" + index}>
                                <img src={info.user.gender === "male" ? male : female} alt="user" className="listitemimg" />
                                <h3>{(info.user._id === this.props.user._id) ? 'You' : info.name.substr(0, 15) + (info.name.length > 15 ? '...' : '')}</h3>
                                <p>Blood Group: {info.bloodgroup}</p>
                                {!this.props.alldonors && <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ color: '#b21e2e' }} /> {(getDistance({ lat: info.location.coordinates[1], lng: info.location.coordinates[0] }, this.props.pos) / 1000).toFixed(2)} km Away</p>}
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '5px', pointerEvents: (info.user._id !== this.props.user._id) ? '' : 'none' }}>
                                    <button className="callbtn" style={{ width: '80px' }}><a href={this.props.requested ? 'tel:+91' + info.user.phone : '/request'} style={{ color: 'white' }}>Contact</a></button>
                                    <a href={this.props.requested ? 'https://wa.me/91' + info.user.phone : 'request'} style={{ color: 'white' }}><WhatsappIcon size={35} round /></a>
                                </div>
                            </div>)
                        } else {
                            return null;
                        }
                    })}
                </div>}
                {this.props.data.length > 0 &&
                    <div className="pages">
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(this.props.data.length / 12)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </div>}
                {this.props.data.length === 0 && <div>
                    <h1>No donors available :(</h1>
                </div>}
            </div>
        )
    }
}

class DonorsFunction extends Component {
    constructor(props) {
        super(props);

        this.onToggleView = this.onToggleView.bind(this);
        this.onChangeBG = this.onChangeBG.bind(this);
        this.onDonorSearch = this.onDonorSearch.bind(this);

        this.state = {
            address: this.props.user.address,
            bloodgroup: this.props.location.data ? this.props.location.data.bloodgroup : this.props.user.bloodgroup,
            data: this.props.location.data ? this.props.location.data.data : [],
            warning: '',
            pos: this.props.location.data ? this.props.location.data.pos : this.props.user.pos,

            view: 'Map',
            donorsview: this.props.location.data ? true : false,

            redirectedview: this.props.location.data ? true : false,
            selectedMarker: false,

            showpopup: false,
            popupDetails: '',
            showdonors: true,
            alldonors: false,
            totaldonors: 0,
            selected: true
        }
    }

    fetchData(bg) {
        if (this.state.alldonors) {
            axios.get('/api/blood/all/' + bg + '&' + this.props.user._id)
                .then(res => {
                    this.setState({ warning: '', donorsview: true, data: res.data })
                    axios.get('/api/blood/total/' + bg)
                        .then(res => {
                            this.setState({ totaldonors: res.data })
                        })
                        .catch(err => {
                            this.setState({ warning: "ERROR Couldn't fetch total" })
                            console.log(err)
                        });
                })
                .catch(err => {
                    this.setState({ warning: 'ERROR Please Try Again' })
                    console.log(err)
                });

        } else {
            axios.get('/api/blood/' + bg + '&' + this.props.user._id + '&' + this.state.pos.lat + '&' + this.state.pos.lng)
                .then(res => {
                    this.setState({ warning: '', donorsview: true, data: res.data })
                    axios.get('/api/blood/total/' + bg)
                        .then(res => {
                            this.setState({ totaldonors: res.data })
                        })
                        .catch(err => {
                            this.setState({ warning: "ERROR Couldn't fetch total" })
                            console.log(err)
                        });
                })
                .catch(err => {
                    this.setState({ warning: 'ERROR Please Try Again' })
                    console.log(err)
                });
        }
    }

    componentDidMount() {
        this.fetchData(this.state.bloodgroup)
        AOS.init({
            duration: 1000
        });
    }

    handleInput(e) {
        this.setState({ address: e.target.value, selected: false })
    }

    onToggleView(e) {
        this.setState({ view: e.target.innerText.split(' ')[0] })
    }

    onChangeBG(e) {
        this.setState({ bloodgroup: e.target.value })
    }

    onDonorSearch(e) {
        e.preventDefault();

        this.setState({ donorsview: false })

        if (!this.state.selected) {
            this.setState({ warning: 'Please select an address from dropdown', showdonors: false, totaldonors: 0 })
            return;
        }

        this.fetchData(this.state.bloodgroup)

    }

    handleClickOnMarker = (marker, event) => {
        if (this.state.selectedMarker !== marker) {
            this.setState({ selectedMarker: marker })
        } else {
            this.setState({ selectedMarker: '' })
        }
    }

    render() {
        return (
            <div className="donors">
                {!this.state.redirectedview && <div className="searchpanel">
                    <h1>Connect With Blood Donors in your location</h1>
                    <form onSubmit={this.onDonorSearch} autoComplete="off">
                        <div className="donorwrapper">
                            <div className="selectionwrapper">
                                <div className="selectionwrapper-1">
                                    <label htmlFor="loc">Location</label>
                                    <Autocomplete
                                        id="loc" name="loc"
                                        apiKey={'AIzaSyBlUmInDBrZR37g8i33_JJMYs9-68oSHOs'/*AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us*/}
                                        onPlaceSelected={(place) => this.setState({ address: place.formatted_address, pos: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }, selected: true })}
                                        onChange={this.handleInput.bind(this)}
                                        placeholder="Select your City"
                                        value={this.state.address}
                                        required
                                    />
                                </div>
                                <div className="selectionwrapper-2">
                                    <label>Blood Group</label>
                                    <select name="bloodgroup" id="bloodgroup" value={this.state.bloodgroup} onChange={this.onChangeBG} required>
                                        <option value="" defaultValue hidden>Select Here</option>
                                        <option value="A-">A-</option>
                                        <option value="A+">A+</option>
                                        <option value="B-">B-</option>
                                        <option value="B+">B+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="O-">O-</option>
                                        <option value="O+">O+</option>
                                        <option value="all">All</option>
                                    </select>
                                </div>
                            </div>
                            <div className="warnsearch">
                                <div className="colorize">{this.state.warning}</div>
                                <button type="submit" className="searchbutton">Search</button>
                                {this.state.showdonors && <div>
                                    <h3 style={{ marginTop: '15px' }}>Total: {this.state.totaldonors} Donor(s)</h3>
                                    {!this.state.alldonors && <h3>Donors within 100 km radius: {this.state.data.length}</h3>}
                                </div>}
                            </div>
                        </div>
                    </form>
                </div>}

                {/*Redirected View*/}
                {this.state.redirectedview && <div className="ty">
                    <h1>Thankyou!</h1><br />
                    <h2>We have recieved your request!</h2>
                    <div className="numdonors">
                        <h1 style={{textAlign: 'center'}}>Searching...</h1>
                        <p className="bold" style={{textAlign: 'center'}}>Blood donors in your area</p>
                        {this.state.data.length > 0 &&
                            <div className="sendingpanel">
                                <div className='samplelistitem' >
                                    <img src={female} alt="user" className="listitemimg" />
                                    <h3>Blood Donor</h3>
                                    <p>Blood Group: O+</p>
                                    <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']} style={{ color: '#b21e2e' }} /> 9.2 km Away</p><br />
                                    <button className="connectbutton">Contact</button>
                                </div>
                                <p className="sampletext">Click on the connect button to contact donors</p>
                            </div>
                        }
                        {this.state.data.length === 0 && <div>
                            <h1 className="nodonors" style={{textAlign: 'center'}}>No donors available :(</h1>
                        </div>}
                    </div>
                    {this.state.data.length > 0 && <div>
                        <h1>Connect with {this.state.data.length} Blood Donor{this.state.data.length > 1 ? 's' : ''}</h1>
                    </div>}
                </div>}

                {/* MAIN FUNCTIONALITY */}
                {this.state.donorsview && <div className="donorsview">
                    <div className="togglenotifs">
                        <div className={(this.state.view === 'Map' ? 'activenotif' : '')} onClick={this.onToggleView}>Map View</div>
                        <div className={(this.state.view === 'List' ? 'activenotif' : '')} onClick={this.onToggleView}>List View</div>
                    </div>

                    <div className="therealview">
                        {this.state.view === 'Map' &&
                            <MapView
                                user={this.props.user}
                                defaults={this.state.pos}
                                selectedMarker={this.state.selectedMarker}
                                markers={this.state.data}
                                onClick={this.handleClickOnMarker}
                                alldonors={this.state.alldonors}
                                requested={this.props.requested}
                            />}
                        {this.state.view === 'List' &&
                            <ListView
                                user={this.props.user}
                                data={this.state.data}
                                pos={this.state.pos}
                                requested={this.props.requested}
                                alldonors={this.state.alldonors}
                            />}
                    </div>
                </div>
                }
            </div>
        )
    }
}

class Donors extends Component {
    render() {
        return (
            this.props.auth ?
                <DonorsFunction user={this.props.user} requested={this.props.requested} location={this.props.location} /> :
                <Redirect to={{ pathname: '/login', state: { from: "donors" } }} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user,
        requested: state.requested
    }
}

export default connect(mapStateToProps)(Donors)