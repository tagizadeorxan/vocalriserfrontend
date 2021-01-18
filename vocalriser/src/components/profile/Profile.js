import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { Redirect } from 'react-router-dom';
import './Profile.css'
import Waveform from '../waveform'
import PianoPlay from '../piano'

const Profile = () => {

    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    let [selected, setSelected] = useState('video')
    let [section, setSection] = useState()

    useEffect(() => {
        checkCurrentUser()
    }, [])

    let checkCurrentUser = async () => {
        console.log(user.token)
        let result = await requestCurrentUser(user.token)
        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })
            setLogin('success')
        } else {
            setLogin('failed')
        }
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
    else {
        return (
            <div className="profile-section">
                <div onMouseEnter={() => setSection(1)} onMouseLeave={() => setSection(0)} className={`bp3-card bp3-elevation-${section === 1 ? '4' : '2'} .modifier profile-section-one`}>
                    <div className="profile-section-one-each">
                        <img alt="user" style={{ width: '100px' }} src="https://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png" />
                    </div>

                    <h1 className="bp3-heading profile-section-one-each">{user.user.first_name} {user.user.last_name}</h1>
                    <div className="profile-section-one-each">
                        <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{user.user.age}</span>
                        <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{user.user.gender}</span>
                    </div>

                    <div className="profile-section-one-each">
                        Sounds like: {user.user.soundslike.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>)}
                    </div>
                    <div className="profile-section-one-each">
                        Microphones: {user.user.microphone.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>)}
                    </div>
                    <div className="profile-section-one-each">
                        Genres: {user.user.genres.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>)}
                    </div>
                    <div className="profile-section-one-each">
                        Country: <span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{user.user.country}</span>
                    City: <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{user.user.city}</span>
                    </div>
                    <div className="profile-section-one-each">
                        Raiting: {user.user.raiting === null ? <span className="bp3-tag">No reviews yet</span> : <span
                            className={`bp3-tag bp3-intent-${parseFloat(user.user.raiting) <= 3 ? 'danger' :
                                parseFloat(user.user.raiting) > 4 ? 'success' : 'warning'}`}>{user.user.raiting}</span>}
                    </div>
                </div>
                <div onMouseEnter={() => setSection(2)} onMouseLeave={() => setSection(0)} className={`bp3-card bp3-elevation-${section === 2 ? '4' : '2'} .modifier profile-section-two`}>
                    <div className="profile-section-two-each">
                        <Waveform url={user.user.track_url} title={user.user.track_title} />
                    </div>

                    <div className="profile-section-two-each">
                        <span className="bp3-tag">About</span> {user.user.about}
                    </div>

                    <div className="bp3-tabs profile-section-two-each">
                        <ul className="bp3-tab-list .modifier" role="tablist">
                            <li onClick={() => setSelected('video')} className="bp3-tab" role="tab" aria-selected={selected === 'video' ? true : false}>Video</li>
                            <li onClick={() => setSelected('review')} className="bp3-tab" role="tab" aria-selected={selected === 'review' ? true : false}>Reviews</li>
                            <li onClick={() => setSelected('connection')} className="bp3-tab" role="tab" aria-selected={selected === 'connection' ? true : false}>Connections</li>
                        </ul>
                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'video' ? false : true}>
                            <iframe width="560" height="315" src={user.user.youtube_link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'review' ? false : true}>Reviews</div>
                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'connection' ? false : true}>Connections</div>
                    </div>
                </div>

            </div>
        )
    }



}

export default Profile