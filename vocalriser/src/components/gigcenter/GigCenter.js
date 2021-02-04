import React, { useState, useContext } from 'react'
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

    const [selected, setSelected] = useState('created')
    const [eachSelected, setEachSelected] = useState('')
    const [creatorGigs, setCreatorGigs] = useState([])
    const [biddedGigs, setBiddedGigs] = useState()
    const [start,setStart] = useState(true)


    const checkCurrentUser = async () => {
        const result = await requestCurrentUser(user.token)
        const creatorGigs = await getGigsByUserID(result.data.id, user.token)
        const biddedGigs = await getBidderSuccessfullGigsByUserID(result.data.id, user.token)
     
        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })
            
            setBiddedGigs(biddedGigs)
            setCreatorGigs(creatorGigs)

            setLogin('success')
        } else {
            setLogin('failed')
        }
    }


    if (start) {
        checkCurrentUser()
        setStart(false)
    }


    if (login === 'waiting') {
        return (
            <PianoPlay width={300} classAdd="loading" />
        )
    }
    else if (login === 'failed') {
        return (
            <Redirect push to="/" />
        )
    }

    else if (!user.user.hasOwnProperty('id')) {
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


                </div> : selected === "created" && creatorGigs.length === 0 ? <p>no created gigs</p>:null}
             
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



                </div> : selected === "bidded" && biddedGigs.length === 0 ? <p>no bidded gigs</p>:null}

            </div>
        )
    }


}

export default GigCenter