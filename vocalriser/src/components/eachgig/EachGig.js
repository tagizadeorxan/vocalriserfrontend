import React, { useContext, useState } from 'react'
import UserContext from '../../contexts/user.context'
import { requestCurrentUser } from '../helpers/auth.helper'
import { getGigByID, getGigBiddings, removeBid, submitBid, closeGigByID, awardGigByID, getBidExist } from '../helpers/gig.helper'
import {createNotification} from '../helpers/notifications.helper'
import { Navigate } from 'react-router-dom';
import Waveform from '../waveform'
import PianoPlay from '../piano'
import './EachGig.css'
import { NavLink, Link } from 'react-router-dom'
import Utils from '../utils/common.utils'


const EachGig = (props) => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [viewedGig, setViewGig] = useState()
    const [bidError, setBidError] = useState('')
    const [bidExist, setBidExist] = useState(false)
    const [biddings, setBiddings] = useState([])
    const [userBid, setUserBid] = useState()
    const bidRef = React.createRef()
    const [selected, setSelected] = useState('genres')
    const [start,setStart] = useState(true)



    const panelSelect = (type) => {
        setSelected(type)
    }

    const handleBid = async () => {

        setBidError('')
        if (bidRef.current.value > viewedGig.budgetMax) {
            setBidError('max')
        } else if (bidRef.current.value < viewedGig.budgetMin) {
            setBidError('min')
        } else {
        
            setBidError('')
            let refresh = await handleRefreshBid()
            let bidExist = await getBidExist({
                user_id: user.user.id,
                gig_id: viewedGig.id
            }, user.token)

            if (bidExist) {
             
                setBiddings(refresh)
            } else {
           
                let bid = {
                    gig_id: viewedGig.id,
                    user_id: user.user.id,
                    amount: bidRef.current.value,
                    full_name: `${user.user.first_name} ${user.user.last_name}`,
                    track_url: user.user.track_url,
                    track_title: user.user.track_title,
                    soundslike: user.user.soundslike
                }

                let result = await submitBid(bid, user.token)

                let notification = {
                    type: "bidGig",
                    fromUser: user.user.id,
                    toUser:viewedGig.user_id,
                    gigID:viewedGig.id
                }
                let notify = await createNotification(notification, user.token) 


                if (result) {
                    window.location.reload(true)
                }
            }
        }
    }


    const handleRefreshGig = async () => {
        let result = false;
        let viewedGig = await getGigByID(props.match.params.id, user.token)
        if (viewedGig) {
            result = viewedGig
        }
        return result
    }

    const closeGig = async () => {
        let refresh = await handleRefreshGig()
        if (refresh) {
            if (refresh.active === 0) {
                setViewGig(refresh)
            } else {

                let result = await closeGigByID(viewedGig.id, user.token)
                if (result) {
                    let updatedGig = { ...viewedGig, active: 0 }
                    setViewGig(updatedGig)
                }
            }
        }
    }

    const awardGig = async (user_id) => {
        let refresh = await handleRefreshGig()
        if (refresh) {
            if (viewedGig.active === 2) {
     
 
                setViewGig(refresh)
           
        
            } else {

                let result = await awardGigByID(viewedGig.id, user_id, user.token)
                if (result) {
               
                    let updatedGig = { ...viewedGig, active: 2, awardedUser: user_id }

                    let notification = {
                        type: "awardGig",
                        fromUser: viewedGig.user_id,
                        toUser:user_id,
                        gigID:viewedGig.id
                    }
                    let notify = await createNotification(notification, user.token)     

                    setViewGig(updatedGig)
                }
            }
        }
    }

    const handleRefreshBid = async () => {
        let result = false;
        let biddings = await getGigBiddings(props.match.params.id, user.token)
        if (biddings) {
            result = biddings
        }
        return result

    }



    const handleRemove = async (bid) => {
        let refresh = await handleRefreshBid()
        let data = {
            user_id:bid.user_id,
            gig_id:viewedGig.id
        }

        
        let bidExist = await getBidExist(data, user.token)
        
        if (refresh) {
            if (bidExist) {
                if (bid.user_id === user.user.id) {
                  
                    let result = await removeBid(bid.id, user.token)
                    if (result) {
                        window.location.reload()
                    }
                }

            } else {
              
                setBiddings(refresh)
            }
        }

    }

    const checkCurrentUser = async () => {
        setBidExist(false)
       
        const result = await requestCurrentUser(user.token)
    
        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })
          
            let viewedGig = await getGigByID(props.match.params.id, user.token)
            let biddings = await getGigBiddings(props.match.params.id, user.token)
          

           
            if (viewedGig) {
                setViewGig(viewedGig)
                setBiddings(biddings)
                let userBid = false;
                
                if (biddings.length > 0) {
                    userBid = biddings.find(x => x.user_id === result.data.id)
                }
                if (userBid) {
                    setBidExist(true)
                    setUserBid(userBid)
                } else {
                    setBidExist(false)
                }
                setLogin('success')
            } else {
                setLogin('waiting')
            }

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
            <PianoPlay width={400} />
        )
    }
    else if (login === 'failed') {
        return (
            <Navigate push to="/" />

        )
    }
    else if (!viewedGig.hasOwnProperty('id')) {
        return (
            <Navigate push to="/jobs" />
        )
    }
    else {

        return (
            <div className="gig-container">
                <div className="bp4-card each-gig-container">
                    <div className="each-gig-element">
                        <h1 className="bp4-heading">{viewedGig.name}</h1>
                        <span className={`bp4-tag bp4-intent-${viewedGig.active === 1 ? 'warning' : viewedGig.active === 2 ? 'success' : 'danger'}`}>
                            {viewedGig.active === 1 ? 'active' : viewedGig.active === 2 ? 'Awarded' : 'Closed'}</span>

                    </div>
                    {viewedGig.active === 1 ? <button onClick={closeGig} style={{ width: "10%" }} className="bp4-button bp4-intent-danger bp4-outlined bp4-small">Close</button> : null}
                    <div className="each-gig-element">
                        <Waveform url={viewedGig.track_url} title={viewedGig.name} />
                    </div>

                    <div className="each-gig-element">
                        Created date:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{new Date(viewedGig.createDate).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                    </div>

                    <div className="each-gig-element">
                        Looking for:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{viewedGig.type === 'V' ? 'vocalist' : 'producer'}</span>
                    </div>
                    <div className="each-gig-element">
                        Language:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{viewedGig.language}</span>
                    Genre:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{viewedGig.genre}</span>
                    BPM:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{viewedGig.bpm}</span>
                    </div>
                    <div className="each-gig-element">
                        Created by:<Link to={`/profiles/${viewedGig.user_id}`}><span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }}
                            className="bp4-tag .modifier">{viewedGig.createdBy}</span></Link>
                    Budget:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className={`bp4-tag .modifier bp4-intent-${bidError === 'min' ? 'danger' : 'success'}`}>{viewedGig.budgetMin}</span>
                    -<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className={`bp4-tag .modifier bp4-intent-${bidError === 'max' ? 'danger' : 'success'}`}>{viewedGig.budgetMax}</span>{Utils.currency}
                    </div>

                    <div className="each-gig-element">
                        Requirements:<p></p><span style={{ marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{viewedGig.requirements}</span>
                    </div>

                </div>
                <div className="bp4-card bid-area">

                    {bidExist ? <div>
                        Your bid is: <span className="bp4-tag">{userBid.amount}</span>
                    </div> : viewedGig.user_id === user.user.id || viewedGig.active !== 1 ? null : <div>
                        <input ref={bidRef} className="bp4-input bp4-intent-primary bp4-large  .modifier" type="number" placeholder="Your bid" dir="auto" />
                        <button onClick={handleBid} style={{ marginLeft: '1%' }} type="button" className="bp4-button bp4-intent-success bp4-large .modifier">Submit</button>
                    </div>}
                </div>

                <div className="bp4-card bid-area">
                    {biddings.length > 0 ? biddings.map((bid, index) => <div key={index}>
                        <blockquote className="bp4-blockquote each-bid bp4-card bp4-interactive" >


                            <div className="each-bid-element">
                                <div style={{ textAlign: 'center' }}> <span className="bp4-tag " >{bid.amount} {Utils.currency}</span></div>
                                <img alt="user" style={{ width: '100px', padding: "5%" }} src="https://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png" />
                                {viewedGig.awardedUser === user.user.id ? <div style={{ marginTop: '7%', textAlign: "center" }}><span className={`bp4-tag bp4-intent-success`}>Successfull bid</span></div> : null}
                                {bidExist && bid.user_id === user.user.id && viewedGig.user_id !== user.user.id && viewedGig.active === 1 ? <div style={{ textAlign: "center" }}><button onClick={() => handleRemove(bid)} className="bp4-button bp4-intent-danger remove-bid">remove Bid</button></div> : null}
                                {viewedGig.user_id === user.user.id && viewedGig.active === 1 ? <div style={{ textAlign: "center" }}><button onClick={() => awardGig(bid.user_id)} className="bp4-button bp4-intent-success remove-bid">Award Gig</button></div> : null}
                            </div>
                            <div className="each-bid-element" style={{ width: '250px' }}>
                                <NavLink to={`/profiles/${bid.user_id}`}> <h1 className="bp4-heading">{bid.full_name} </h1></NavLink>

                                <div className="bp4-tabs">
                                    <ul className="bp4-tab-list .modifier" role="tablist">
                                        <li onClick={() => panelSelect('genres')} className="bp4-tab" role="tab" aria-selected={selected === 'genres' ? true : false}>Genres</li>
                                        <li onClick={() => panelSelect('microphones')} className="bp4-tab" role="tab" aria-selected={selected === 'microphones' ? true : false}>Microphone</li>
                                        <li onClick={() => panelSelect('soundslike')} className="bp4-tab" role="tab" aria-selected={selected === 'soundslike' ? true : false}>Sounds like</li>
                                    </ul>
                                    <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'genres' ? false : true}>
                                        {bid.genres.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{g}</span>)}
                                    </div>
                                    <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'microphones' ? false : true}>
                                        {bid.microphone.split(',').map((m, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{m}</span>)}
                                    </div>
                                    <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'soundslike' ? false : true}>
                                        {bid.soundslike.split(',').map((s, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{s}</span>)}
                                    </div>
                                </div>

                            </div>
                            <div className="each-bid-element" style={{ marginTop: '0%' }}>
                                <Waveform url={bid.track_url} title={bid.track_title} className="bid-waveform" />

                            </div>
                            <div>


                            </div>

                        </blockquote>
                    </div>) : null}
                </div>
            </div>

        )
    }
}

export default EachGig