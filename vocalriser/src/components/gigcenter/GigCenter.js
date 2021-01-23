import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getGigsByUserID, getBidderSuccessfullGigsByUserID } from '../helpers/gig.helper'
import PianoPlay from '../piano'
import { Link } from 'react-router-dom'
import './GigCenter.css'


let GigCenter = () => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [userdata, setUserData] = useState({})
    const [selected, setSelected] = useState('created')
    const [eachSelected, setEachSelected] = useState('')
    const [creatorGigs, setCreatorGigs] = useState([])
    const [biddedGigs, setBiddedGigs] = useState()

    useEffect(() => {
        checkCurrentUser()
    }, [])

    let checkCurrentUser = async () => {
        let result = await requestCurrentUser(user.token)
        let creatorGigs = await getGigsByUserID(result.data.id, user.token)
        let biddedGigs = await getBidderSuccessfullGigsByUserID(result.data.id, user.token)
        console.log(biddedGigs)
        if (result.status) {
            console.log(creatorGigs)
            setBiddedGigs(biddedGigs)
            setCreatorGigs(creatorGigs)
            setUserData(result.data)
            setLogin('success')
        } else {
            setLogin('failed')
        }
    }

    if (login === 'waiting') {
        return (
            <PianoPlay width={300} />
        )
    }
    else if (login === 'failed') {
        return (
            <Redirect push to="/" />
        )
    }

    else if (!userdata.hasOwnProperty('id')) {
        return (
            <Redirect push to="/" />
        )
    }

    else {
        return (
            <div className="gig-center-container">

                <nav className="bp3-navbar .modifier" style={{ marginBottom: "5%" }}>

                    <div className="bp3-navbar-group bp3-align-left">
                        <button onClick={() => setSelected('created')} className="bp3-button bp3-minimal" style={selected === 'created' ? { backgroundColor: 'green', color: 'white' } : null}>Created Gigs</button>
                        <button onClick={() => setSelected('bidded')} className="bp3-button bp3-minimal" style={selected === 'bidded' ? { backgroundColor: 'green', color: 'white' } : null}>Bidded Gigs</button>

                    </div>
                </nav>


                { selected === 'created' && creatorGigs.length > 0 ? <div className="bp3-tabs">
                    <ul className="bp3-tab-list bp3-large .modifier" role="tablist">

                        {/* active:1, closed:0 - in gigs active   //  */}
                        <li onClick={() => setEachSelected('active')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'active' ? true : false}>Active</li>
                        <li onClick={() => setEachSelected('pending')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'pending' ? true : false}>Pending</li>
                        <li onClick={() => setEachSelected('progress')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'progress' ? true : false}>Progress</li>
                        <li onClick={() => setEachSelected('completed')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'completed' ? true : false}>Completed</li>
                        <li onClick={() => setEachSelected('closed')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'closed' ? true : false}>Closed</li>


                    </ul>

                    {creatorGigs.map((gig, index) => {
                        if (gig.active === 1) {
                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'active' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/gigs/${gig.id}`}><h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>

                            </div>
                        } else if (gig.active === 2 && gig.progress === 0) {
                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'pending' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/awardedgigs/${gig.id}`}><h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>
                            </div>
                        } else if (gig.active === 2 && gig.progress === 1) {
                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'progress' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/awardedgigs/${gig.id}`}><h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>
                            </div>
                        } else if (gig.active === 2 && gig.progress === 2) {

                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'completed' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/awardedgigs/${gig.id}`}><h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>
                            </div>
                        } else if (gig.active === 0) {
                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'closed' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/gigs/${gig.id}`}> <h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>
                            </div>
                        }
                        return null
                    })}


                </div> : null}

                { selected === 'bidded' && biddedGigs.length > 0 ? <div className="bp3-tabs">
                    <ul className="bp3-tab-list bp3-large .modifier" role="tablist">
                        <li onClick={() => setEachSelected('pending')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'pending' ? true : false}>Pending</li>
                        <li onClick={() => setEachSelected('progress')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'progress' ? true : false}>Progress</li>
                        <li onClick={() => setEachSelected('completed')} className="bp3-tab" role="tab" aria-selected={eachSelected === 'completed' ? true : false}>Completed</li>

                    </ul>

                    {biddedGigs.map((gig, index) => {
                        if (gig.active === 2 && gig.progress === 0) {
                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'pending' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/awardedgigs/${gig.id}`}><h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>
                            </div>
                        } else if (gig.active === 2 && gig.progress === 1) {
                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'progress' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/awardedgigs/${gig.id}`}><h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>
                            </div>
                        } else if (gig.active === 2 && gig.progress === 2) {

                            return <div key={index} className="bp3-tab-panel" role="tabpanel" aria-hidden={eachSelected === 'completed' ? false : true}>
                                <div className="bp3-card bp3-elevation-2 .modifier">
                                    <Link to={`/awardedgigs/${gig.id}`}><h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span>create date: </span><span className="bp3-tag">{gig.createDate.substring(0, 10)}</span>
                                    <span style={{ marginLeft: '1%' }} >genre:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.genre}</span>
                                    <span style={{ marginLeft: '1%' }} >bpm:</span><span style={{ marginLeft: '1%' }} className="bp3-tag">{gig.bpm}</span>
                                </div>
                            </div>
                        }
                        return null
                    })}



                </div> : null}

            </div>
        )
    }


}

export default GigCenter