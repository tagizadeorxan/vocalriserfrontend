import React, { useContext, useState, useRef } from 'react'
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import {updateUser} from '../helpers/profile.helper'
import { Redirect } from 'react-router-dom';
import './Profile.css'
import Waveform from '../waveform'
import PianoPlay from '../piano'
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";






const Profile = () => {

    const image = useRef()
    const first_name = useRef()
    const last_name = useRef()
    const age = useRef()
    const country = useRef()
    const city = useRef()
    const track_title = useRef()
    const track_url = useRef()
    const about = useRef()
    const youtube_link = useRef()

    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    let [selected, setSelected] = useState('video')
    let [section, setSection] = useState()
    const [start, setStart] = useState(true)
    const [editing, setEditing] = useState(false)
    const [soundsTags, setSoundsTags] = useState([])
    const [microphoneTags, setMicrophoneTags] = useState([])
    const [genresTags, setGenresTags] = useState([])


    const handleSave = async (e) => {
        e.preventDefault()
        
        let data = {
          image:image.current.value,
          first_name:first_name.current.value,
          last_name:last_name.current.value,
          age:parseInt(age.current.value),
          country:country.current.value,
          city:city.current.value,
          track_title:track_title.current.value,
          track_url:track_url.current.value,
          about:about.current.value,
          youtube_link:youtube_link.current.value,
          genres:genresTags.join(","),
          microphone:microphoneTags.join(","),
          soundslike:soundsTags.join(",")
        }
        console.log(image.current.value)
        console.log(data)

        const result = await updateUser(user.user.id,data,user.token)
        if(result) {
            setEditing(false)
             window.location.reload()
        }


    }


    const checkCurrentUser = async () => {

        const result = await requestCurrentUser(user.token)
        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })

            setSoundsTags(result.data.soundslike.split(','))
            setMicrophoneTags(result.data.microphone.split(','))
            setGenresTags(result.data.genres.split(','))
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
            <Redirect push to="/home" />
        )
    }
    else {
        return (
            <div >
                <form onSubmit={handleSave} className="profile-section">
                    <div onMouseEnter={() => setSection(1)} onMouseLeave={() => setSection(0)} className={`bp3-card bp3-elevation-${section === 1 ? '4' : '2'} .modifier profile-section-one`}>
                        <div className="profile-section-one-each">
                            {!editing ? <img alt="user" style={{ width: '100px' }} src={user.user.image} /> : <label className="bp3-tag">profile picture: </label>}
                            <p></p>
                            {editing ?  <input style={{ marginBottom: "4%",width:"100%" }} ref={image} type={"text"} className="bp3-input" minLength={5} maxLength={400} placeholder="Image url...http://image.png" defaultValue={user.user.image} autoComplete="on" /> : null}
                        </div>



                        {!editing ? <h1 className="bp3-heading profile-section-one-each">{user.user.first_name} {user.user.last_name}</h1> : <label className="bp3-tag">first name and last name: </label>}
                        <p></p>
                        {editing ? <input ref={first_name} type={"text"}  className="bp3-input" minLength={3} maxLength={15} placeholder="First name" defaultValue={user.user.first_name} autoComplete="on" required/> : null}
                        <p></p>
                        {editing ? <input ref={last_name}  type={"text"} minLength={3} maxLength={15} className="bp3-input" placeholder="Last name" defaultValue={user.user.last_name} autoComplete="on" required/> : null}

                        {!editing ? <button onClick={() => setEditing(true)} className="bp3-button">edit profile</button> : null}

                        <div className="profile-section-one-each">
                            {!editing ? <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{user.user.age}</span> : <label className="bp3-tag">feeling age: </label>}
                            <p></p>
                            {editing ? <input ref={age} type={"number"} min={5} max={200} className="bp3-input" placeholder="Your feeling age" defaultValue={user.user.age} autoComplete="on" required/> : null}
                            {!editing? <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{user.user.gender}</span> : null }
                        </div>

                        <div className="profile-section-one-each">
                        Sounds like: {!editing ? user.user.soundslike.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>) :
                                <div style={{marginTop:"1%"}}>
                                    <TagsInput
                                        maxTags={5}
                                        name="tags"
                                        value={soundsTags}
                                        onChange={tags => {

                                            setSoundsTags(tags);
                                        }}
                                    />
                                </div>}

                        </div>
                        <div className="profile-section-one-each">
                            Microphones: {!editing ? user.user.microphone.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>) :
                                <div style={{marginTop:"1%"}}>
                                    <TagsInput
                                        maxTags={5}
                                        name="tags"
                                        value={microphoneTags}
                                        onChange={tags => {

                                            setMicrophoneTags(tags);
                                        }}
                                    />
                                </div>}

                        </div>
                        <div className="profile-section-one-each">
                            Genres: {!editing ? user.user.genres.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>) :
                                <div style={{marginTop:"1%"}}>
                                    <TagsInput
                                        maxTags={5}
                                        name="tags"
                                        value={genresTags}
                                        onChange={tags => {

                                            setGenresTags(tags);
                                        }}
                                    />
                                </div>
                            }
                        </div>
                        <div className="profile-section-one-each">
                            Country: {!editing ? <span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{user.user.country}</span> :
                                <input ref={country} type={"text"} minLength={3} maxLength={15} className="bp3-input" placeholder="Country..." defaultValue={user.user.country} autoComplete="on" required />}
                            <p></p>
                    City: {!editing ? <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{user.user.city}</span>
                                : <input ref={city} minLength={2} type={"text"} maxLength={15} className="bp3-input" placeholder="City..." defaultValue={user.user.city} autoComplete="on" required />
                            }
                        </div>
                        <div className="profile-section-one-each">
                            Raiting: {user.user.raiting === null ? <span className="bp3-tag">No reviews yet</span> : <span
                                className={`bp3-tag bp3-intent-${parseFloat(user.user.raiting) <= 3 ? 'danger' :
                                    parseFloat(user.user.raiting) > 4 ? 'success' : 'warning'}`}>{user.user.raiting}</span>}
                        </div>
                    </div>
                    <div onMouseEnter={() => setSection(2)} onMouseLeave={() => setSection(0)} className={`bp3-card bp3-elevation-${section === 2 ? '4' : '2'} .modifier profile-section-two`}>
                        <div className="profile-section-two-each">
                            {!editing ? <Waveform url={user.user.track_url} title={user.user.track_title} /> :
                                <div>
                                   Track title: <input ref={track_title} style={{ width: "100%" ,marginTop:'1%'}} type={"text"} minLength={5} maxLength={30} className="bp3-input" placeholder="Track Title..." defaultValue={user.user.track_title} autoComplete="on" required/>
                                    <p></p>
                                   Track url: <input ref={track_url} style={{ width: "100%" ,marginTop:'1%'}} type={"text"} minLength={5} maxLength={200} className="bp3-input" placeholder="Track url....mp3" defaultValue={user.user.track_url} autoComplete="on" required/>
                                </div>
                            }
                        </div>

                        <div className="profile-section-two-each">
                            <span className="bp3-tag">About</span> {!editing ? user.user.about :
                                <textarea ref={about} minLength={50} style={{ marginTop: "1%", width: "100%", height: "150px" }} type={"text"} maxLength={500} className="bp3-input" placeholder="About..." defaultValue={user.user.about} autoComplete="on" required />
                            }
                        </div>

                        <div className="bp3-tabs profile-section-two-each">
                            <ul className="bp3-tab-list .modifier" role="tablist">
                                <li onClick={() => setSelected('video')} className="bp3-tab" role="tab" aria-selected={selected === 'video' ? true : false}>Video</li>
                                <li onClick={() => setSelected('review')} className="bp3-tab" role="tab" aria-selected={selected === 'review' ? true : false}>Reviews</li>
                                <li onClick={() => setSelected('connection')} className="bp3-tab" role="tab" aria-selected={selected === 'connection' ? true : false}>Connections</li>
                            </ul>
                            <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'video' ? false : true}>
                                {!editing ? <iframe title="video" width="560" height="315" src={user.user.youtube_link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> :
                                    <input ref={youtube_link} style={{ width: "100%" }} type={"text"} minLength={5} maxLength={200} className="bp3-input" placeholder="Youtube link..." defaultValue={user.user.youtube_link} autoComplete="on" required />
                                }
                            </div>
                            <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'review' ? false : true}>Reviews</div>
                            <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'connection' ? false : true}>Connections</div>
                        </div>
                        {editing ? <button style={{ float: 'right', marginTop: "2%" }} className="bp3-button">save</button> : null}
                    </div>
                </form>
            </div>
        )
    }



}

export default Profile