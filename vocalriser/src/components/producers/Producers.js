import React, { useState, useContext } from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getProducers } from '../helpers/producers.helper'
import Search from './Search'
import Waveform from "../waveform";
import './Producers.css'
import PianoPlay from '../piano'




const Producers = () => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    let [producers, setProducers] = useState([])
    let [pageSize, setPageSize] = useState(1)
    let [currentPage, setCurrentPage] = useState(1)
    const [selected, setSelected] = useState('genres')
    const [start,setStart] = useState(true)





    let getProducersList = async () => {
        let producersList = await getProducers(user.token)

        setPageSize(Math.ceil(producersList.length === 0 ? (producersList.length + 1) / 2 : producersList.length / 2))
        setProducers(producersList)
        dispatch({
            type: 'PRODUCERS',
            payload: producersList
        })
    }

    const panelSelect = (type) => {
        setSelected(type)
    }

    const changePage = (page) => {
        switch (page) {
            case 'prev':
                setCurrentPage(currentPage - 1)
                break;
            case 'next':
                setCurrentPage(currentPage + 1)
                break;

            default:
                break;
        }
    }



    const setSearchData = (data) => {

        setPageSize(1)
        if (Object.keys(data).length === 0) {
            setProducers(user.producers)
            setPageSize(Math.ceil(user.producers.length === 0 ? (user.producers.length + 1) / 2 : user.producers.length / 2))

        } else {
            let filterProducers = user.producers.filter(p => {
                for (let key in data) {
                    if (!p[key].toLowerCase().includes(data[key].toLowerCase()))
                        return false
                }
                return true
            })

            setProducers(filterProducers)
            setPageSize(Math.ceil(filterProducers.length === 0 ? filterProducers.length + 1 / 2 : filterProducers.length / 2))
        }


    }

    const checkCurrentUser = async () => {
        const result = await requestCurrentUser(user.token)
        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })
            setLogin('success')
            getProducersList()
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
            <Navigate push to="/home" />
        )
    }
    else {
        return (
            <div className="producer-page-container">
                <Search search={setSearchData} />
                <div style={{ marginLeft: '5%' }}>
                    <div className="producers-container">

                        {producers.length > 0 ? producers.slice((currentPage - 1) * 2, currentPage * 2).map((producer, index) => <div key={index}>
                            <blockquote className="bp4-blockquote each-producer bp4-card bp4-interactive">
                                <div className="each-producer-element" style={{ width: '100px' }}>
                                    <img alt="user" style={{ width: '100px' }} src="https://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png" />
                                </div>
                                <div className="each-producer-element" style={{ width: '500px' }}>
                                    <NavLink to={`/profiles/${producer.id}`}> <h1 className="bp4-heading">{producer.first_name} {producer.last_name} </h1></NavLink>
                                    <span style={{ marginLeft: '1%' }} className="bp4-tag .modifier">{producer.age}</span>
                                    <span style={{ marginLeft: '1%' }} className="bp4-tag .modifier">{producer.gender}</span>

                                    <div className="bp4-tabs">
                                        <ul className="bp4-tab-list .modifier" role="tablist">
                                            <li onClick={() => panelSelect('genres')} className="bp4-tab" role="tab" aria-selected={selected === 'genres' ? true : false}>Genres</li>
                                            <li onClick={() => panelSelect('microphones')} className="bp4-tab" role="tab" aria-selected={selected === 'microphones' ? true : false}>Microphone</li>
                                            <li onClick={() => panelSelect('soundslike')} className="bp4-tab" role="tab" aria-selected={selected === 'soundslike' ? true : false}>Sounds like</li>
                                        </ul>
                                        <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'genres' ? false : true}>
                                            {producer.genres.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{g}</span>)}
                                        </div>
                                        <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'microphones' ? false : true}>
                                            {producer.microphone.split(',').map((m, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{m}</span>)}
                                        </div>
                                        <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'soundslike' ? false : true}>
                                            {producer.soundslike.split(',').map((s, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{s}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '3%' }} >
                                    {/* <button style={{marginTop:'7%',marginLeft:'10%',display:'block'}} type="button" className="bp4-button">Connect</button> */}


                                    <Waveform url={producer.track_url} title={producer.track_title} />


                                </div>

                            </blockquote>
                        </div>) : null}


                    </div>

                    <div className="pagination">
                        {/* {[...Array(pageSize)].map((p, i) => <span className="bp4-tag .modifier">{i + 1}</span>)} */}

                        {currentPage === 1 ? null : <span onClick={() => changePage('prev')} className="bp4-tag .modifier page-change">previous page</span>}
                        {currentPage === pageSize ? null : <span onClick={() => changePage('next')} className="bp4-tag .modifier page-change">next page</span>}
                    </div>
                </div>



            </div>
        )
    }


}

export default Producers