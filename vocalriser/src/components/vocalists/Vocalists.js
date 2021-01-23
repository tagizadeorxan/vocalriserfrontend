
import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import Search from './Search'
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import './Vocalist.css'
import { getVocalists } from '../helpers/vocalists.helper'
import Waveform from "../waveform";
import PianoPlay from '../piano'
import { Link } from 'react-router-dom'


const Vocalists = () => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [selected, setSelected] = useState('genres')
    let [vocalists, setVocalists] = useState([])
    let [pageSize, setPageSize] = useState(1)
    let [currentPage, setCurrentPage] = useState(1)
    const [userdata,setUserData] = useState({})



    let getVocalistsList = async () => {
        let vocalistList = await getVocalists(user.token)
        console.log(vocalistList)
        setPageSize(Math.ceil(vocalistList.length === 0 ? (vocalistList.length + 1) / 2 : vocalistList.length / 2))
        setVocalists(vocalistList)
        dispatch({
            type: 'VOCALISTS',
            payload: vocalistList
        })
    }

    useEffect(() => {
        
        checkCurrentUser()
    }, [])

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
            setVocalists(user.vocalists)
            setPageSize(Math.ceil(user.vocalists.length === 0 ? (user.vocalists.length + 1) / 2 : user.vocalists.length / 2))

        } else {
            let filterVocalists = user.vocalists.filter(v => {
                for (let key in data) {
                    if (!v[key].toLowerCase().includes(data[key].toLowerCase()))
                        return false
                }
                return true
            })

            setVocalists(filterVocalists)
            setPageSize(Math.ceil(filterVocalists.length === 0 ? filterVocalists.length + 1 / 2 : filterVocalists.length / 2))
        }


    }

    let checkCurrentUser = async () => {
        let result = await requestCurrentUser(user.token)
        if (result.status) {
            setUserData(result.data)
            setLogin('success')
            getVocalistsList()
        } else {
            setLogin('failed')
        }
    }

    if (login === 'waiting') {
        return (
            <PianoPlay width={300} classAdd="loading"/>
        )
    }
    else if (login === 'failed') {
        return (
            <Redirect push to="/" />
        )
    }

    else if (!userdata.hasOwnProperty('id')) {
        return (
           <Redirect push to="/home" />
        )
    }

    else {
        return (
            <div className="vocalist-page-container">
                <Search search={setSearchData} />
                <div style={{ marginLeft: '5%' }}>
                    <div className="vocalists-container">

                        {vocalists.length > 0 ? vocalists.slice((currentPage - 1) * 2, currentPage * 2).map((vocalist, index) => <div key={index}>
                            <blockquote className="bp3-blockquote bp3-card bp3-interactive each-vocalist">
                                <div className="each-vocalist-element" style={{width:'100px'}}>
                                    <img alt="user" style={{ width: '100px' }} src="https://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png" />
                                </div>
                                <div className="each-vocalist-element" style={{width:'500px'}} >
                                    <Link to={`/profiles/${vocalist.id}`}> <h1 className="bp3-heading">{vocalist.first_name} {vocalist.last_name} </h1></Link>
                                    <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{vocalist.age}</span>
                                    <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{vocalist.gender}</span>

                                    <div className="bp3-tabs">
                                        <ul className="bp3-tab-list .modifier" role="tablist">
                                            <li onClick={() => panelSelect('genres')} className="bp3-tab" role="tab" aria-selected={selected === 'genres' ? true : false}>Genres</li>
                                            <li onClick={() => panelSelect('microphones')} className="bp3-tab" role="tab" aria-selected={selected === 'microphones' ? true : false}>Microphone</li>
                                            <li onClick={() => panelSelect('soundslike')} className="bp3-tab" role="tab" aria-selected={selected === 'soundslike' ? true : false}>Sounds like</li>
                                        </ul>
                                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'genres' ? false : true}>
                                            {vocalist.genres.split(',').map((g, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{g}</span>)}
                                        </div>
                                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'microphones' ? false : true}>
                                            {vocalist.microphone.split(',').map((m, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{m}</span>)}
                                        </div>
                                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'soundslike' ? false : true}>
                                            {vocalist.soundslike.split(',').map((s, i) => <span key={i} style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{s}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '3%'}} className="each-vocalist-element">
                                    {/* <button style={{marginTop:'7%',marginLeft:'10%',display:'block'}} type="button" className="bp3-button">Connect</button> */}


                                    <Waveform url={vocalist.track_url} title={vocalist.track_title} />


                                </div>

                            </blockquote>
                        </div>) : null}


                    </div>

                    <div className="pagination">
                        {/* {[...Array(pageSize)].map((p, i) => <span className="bp3-tag .modifier">{i + 1}</span>)} */}

                        {currentPage === 1 ? null : <span onClick={() => changePage('prev')} className="bp3-tag .modifier page-change">previous page</span>}
                        {currentPage === pageSize ? null : <span onClick={() => changePage('next')} className="bp3-tag .modifier page-change">next page</span>}
                    </div>
                </div>



            </div>
        )
    }


}

export default Vocalists