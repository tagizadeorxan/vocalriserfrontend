import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getVocalists } from '../helpers/vocalists.helper'
import { getProducers } from '../helpers/producers.helper'
import { getAllActiveGigs } from '../helpers/gig.helper'
import PianoPlay from '../piano'
import icon from '../../images/home_vocalriser.png'
import pianoImage from '../../images/piano.jpg'
import scoreOne from '../../images/scoreOne.jpg'
import scoreTwo from '../../images/scoreTwo.jpg'
import './Home.css'
import useSound from 'use-sound';
import nocturne from '../songs/nocturne.mp3';

const Home = () => {
    const [play, { pause }] = useSound(nocturne);
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [start, setStart] = useState(true)
    const [oneTime, setOneTime] = useState(0)
    const [statistics, setStatistics] = useState({})


    const scrollBar = React.createRef()



    const handleScroll = () => {
        const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
        const scrollTop = scrollBar.current.scrollTop


        if (localStorage.getItem('homeSound') === 'true') {
            if (scrollTop > 100) {
                if (oneTime === 0) {
                    play()
                    setOneTime(1)
                }
            } else {
                pause()
                setOneTime(0)
            }
        }
    }

    const getStatistics = async (token) => {
        const vocalists = await getVocalists(token)
        const producers = await getProducers(token)
        const activeJobs = await getAllActiveGigs(token)


        const statistics = {
            vocalists: vocalists.length,
            producers: producers.length,
            activeJobs: activeJobs.length
        }
        setStatistics(statistics)
    }

    const checkCurrentUser = async () => {

        const result = await requestCurrentUser(user.token)
        getStatistics(user.token)
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
            <Navigate push to="/" />
        )
    }

    else if (!user.user.hasOwnProperty('id')) {
        return (
            <Navigate push to="/" />
        )
    }

    else {
        return (
            <div className="home-container" ref={scrollBar} onScroll={handleScroll} style={{ textAlign: 'center' }} >

                <div className="home-icon">
                    <img src={icon} alt="icon" />
                    <div className="bp3-navbar-group bp3-align-center">
                        <button className="bp3-button bp3-minimal">Vocalists: {statistics.vocalists ? statistics.vocalists : '...'}</button>
                        <span className="bp3-navbar-divider"></span>
                        <button className="bp3-button bp3-minimal">Producers: {statistics.producers ? statistics.producers : '...'}</button>
                    </div>
                    <div className="bp3-navbar-group bp3-align-center">
                        <button className="bp3-button bp3-minimal">Jobs: {statistics.activeJobs ? statistics.activeJobs : '...'}</button>
                    </div>
                </div>

                <img id="pageOne" alt="pageOne" src={scoreOne} />
                <img id="pageTwo" alt="pageTwo" src={scoreTwo} />

            </div>
        )
    }


}

export default Home