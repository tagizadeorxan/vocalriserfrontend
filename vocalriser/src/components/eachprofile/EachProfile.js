import React, { useContext, useState, useRef } from 'react'
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getUserByID } from '../helpers/profile.helper'
import { createMessage, sendMessage } from '../helpers/messages.helper'
import { createNotification } from '../helpers/notifications.helper'
import { Navigate } from 'react-router-dom';
import Waveform from '../waveform'
import PianoPlay from '../piano'



const EachProfile = (props) => {

    const messageInput = useRef()

    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    let [selected, setSelected] = useState('video')
    let [section, setSection] = useState()
    let [viewUser, setViewUser] = useState({})
    const [message, setMessage] = useState()
    const [start,setStart] = useState(true)


    const handlSendMessage = async (e) => {
        e.preventDefault()
        

        let data = {
            sender: user.user.id,
            sender_fullname: `${user.user.first_name} ${user.user.last_name}`,
            reciever: viewUser.id,
            reciever_fullname: `${viewUser.first_name} ${viewUser.last_name}`,
            message: messageInput.current.value
        }
        let result = await createMessage(data, user.token)

        if (result.hasOwnProperty("id")) {
            setMessage(false)
            let notification = {
                type: "message",
                fromUser: user.user.id,
                toUser: viewUser.id,
                messageID: result.id
            }
            let notify = await createNotification(notification, user.token)
        }
    }



    const checkCurrentUser = async () => {

        const result = await requestCurrentUser(user.token)
        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })
      
            let viewedUser = await getUserByID(props.match.params.id, user.token)
       
            if (viewedUser) {
                setViewUser(viewedUser)
            
                setLogin('success')
            } else {
                setLogin('failed')
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

    else if (!viewUser.hasOwnProperty('id')) {
       props.history.goBack()
        return (
            <p></p>
        )
    }
    else {
       

        return (
            <div className="profile-section">
                <div onMouseEnter={() => setSection(1)} onMouseLeave={() => setSection(0)} className={`bp3-card bp3-elevation-${section === 1 ? '4' : '2'} .modifier profile-section-one`}>
                    <div className="profile-section-one-each">
                        <img alt="user" style={{ width: '100px' }} src={viewUser.image} />

                    </div>

                    <h1 className="bp3-heading profile-section-one-each">{viewUser.first_name} {viewUser.last_name}</h1>
                    {viewUser.id !== user.user.id? <button onClick={() => setMessage(true)} className="bp3-button">message</button>:null}


                    <div className="profile-section-one-each">
                        <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{viewUser.age}</span>
                        <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{viewUser.gender}</span>
                    </div>

                    <div className="profile-section-one-each">
                        Sounds like: {viewUser.soundslike.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>)}
                    </div>
                    <div className="profile-section-one-each">
                        Microphones: {viewUser.microphone.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>)}
                    </div>
                    <div className="profile-section-one-each">
                        Genres: {viewUser.genres.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>)}
                    </div>
                    <div className="profile-section-one-each">
                        Country: <span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewUser.country}</span>
                    City: <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{viewUser.city}</span>
                    </div>
                    <div className="profile-section-one-each">
                   
                        Raiting: {viewUser.raiting === null  ? <span className="bp3-tag">No reviews yet</span> : <span
                            className={`bp3-tag bp3-intent-${parseFloat(viewUser.raiting) <= 3 ? 'danger' :
                                parseFloat(viewUser.raiting) > 4 ? 'success' : 'warning'}`}>{viewUser.raiting}</span>}
                    </div>
                </div>
                <div onMouseEnter={() => setSection(2)} onMouseLeave={() => setSection(0)} className={`bp3-card bp3-elevation-${section === 2 ? '4' : '2'} .modifier profile-section-two`}>
                    <div className="profile-section-two-each">
                        <Waveform url={viewUser.track_url} title={viewUser.track_title} />
                    </div>

                    <div className="profile-section-two-each">
                        <span className="bp3-tag">About</span> {viewUser.about}
                    </div>

                    <div className="bp3-tabs profile-section-two-each">
                        <ul className="bp3-tab-list .modifier" role="tablist">
                            <li onClick={() => setSelected('video')} className="bp3-tab" role="tab" aria-selected={selected === 'video' ? true : false}>Video</li>
                            <li onClick={() => setSelected('review')} className="bp3-tab" role="tab" aria-selected={selected === 'review' ? true : false}>Reviews</li>
                            <li onClick={() => setSelected('connection')} className="bp3-tab" role="tab" aria-selected={selected === 'connection' ? true : false}>Connections</li>
                        </ul>
                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'video' ? false : true}>
                            <iframe title="video" width="560" height="315" src={viewUser.youtube_link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'review' ? false : true}>Reviews</div>
                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'connection' ? false : true}>Connections</div>
                    </div>
                </div>

                {message ? <div className="bp3-dialog-container">
                    <div className="bp3-dialog">
                        <div className="bp3-dialog-header">
                            <span className="bp3-icon-large bp3-icon-inbox"></span>
                            <h4 className="bp3-heading">Message</h4>
                            <button aria-label="Close" className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross"></button>
                        </div>
                        <div className="bp3-dialog-body">
                            <form onSubmit={handlSendMessage}>
                                <input ref={messageInput} type="text" className="bp3-input" required minLength={1} />
                                <button onClick={() => setMessage(false)} type="button" className="bp3-button">close</button>
                                <button type="submit" className="bp3-button bp3-intent-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </div> : null}


            </div>
        )
    }



}

export default EachProfile