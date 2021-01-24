import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getGigs } from '../helpers/gig.helper'
import PianoPlay from '../piano'
import Search from './Search'
import Waveform from "../waveform";
import { Link } from 'react-router-dom'
import './Jobs.css'

let start = true

const Jobs = () => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [gigs, setGigs] = useState([])
    const [selected, setSelected] = useState('requirements')
    let [pageSize, setPageSize] = useState(1)
    let [currentPage, setCurrentPage] = useState(1)
    const [userdata,setUserData] = useState({})




    const setSearchData = (data) => {
        setPageSize(1)
        if (Object.keys(data).length === 0) {
            setGigs(user.gigs)
            setPageSize(Math.ceil(user.gigs.length === 0 ? (user.gigs.length + 1) / 2 : user.gigs.length / 2))

        } else {
            let filterJobs = user.gigs.filter(g => {
                for (let key in data) {
                    if (!g[key].toLowerCase().includes(data[key].toLowerCase()))
                        return false
                }
                return true
            })

            setGigs(filterJobs)
            setPageSize(Math.ceil(filterJobs.length === 0 ? filterJobs.length + 1 / 2 : filterJobs.length / 2))
        }


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

    let checkCurrentUser = async () => {
        let result = await requestCurrentUser(user.token)
        console.log(result)
        if (result.status) {
            console.log(result)

            let gigs = await getGigs(result.data.type, result.data.gender, user.token)
            setPageSize(Math.ceil(gigs.length === 0 ? (gigs.length + 1) / 2 : gigs.length / 2))
            console.log(gigs)
            setGigs(gigs)
            dispatch({
                type: "GIGS",
                payload: gigs
            })
            setUserData(result.data)
            setLogin('success')
        } else {
            setLogin('failed')
        }
    }

    if(start) {
        checkCurrentUser()
        start = false
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

    else if (!userdata.hasOwnProperty('id')) {
        return (
           <Redirect push to="/home" />
        )
    }

    else {
        return (
            <div className="job-page-container">
                <Search search={setSearchData} />
                <div style={{ marginLeft: '5%' }}>
                    <div className="jobs-container">

                        {gigs.length > 0 ? gigs.slice((currentPage - 1) * 2, currentPage * 2).map((gig, index) => <div key={index}>
                            <blockquote className="bp3-blockquote bp3-card bp3-interactive each-job">
                                <div className="each-job-element">
                                    {/* <img alt="user" style={{ width: '100px' }} src="https://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png" /> */}
                                </div>
                                <div className="each-job-element" style={{ width: '500px' }}>
                                    <Link to={`/gigs/${gig.id}`}> <h1 className="bp3-heading">{gig.name}</h1></Link>
                                    <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{gig.bpm}</span>
                                    <span style={{ marginLeft: '1%' }} className="bp3-tag .modifier">{gig.genre}</span>

                                    <div className="bp3-tabs">
                                        <ul className="bp3-tab-list .modifier" role="tablist">
                                            <li onClick={() => panelSelect('requirements')} className="bp3-tab" role="tab" aria-selected={selected === 'requirements' ? true : false}>Requirements</li>
                                            <li onClick={() => panelSelect('language')} className="bp3-tab" role="tab" aria-selected={selected === 'language' ? true : false}>Language</li>
                                            <li onClick={() => panelSelect('budget')} className="bp3-tab" role="tab" aria-selected={selected === 'budget' ? true : false}>Budget</li>
                                        </ul>
                                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'requirements' ? false : true}>
                                            <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{gig.requirements.substring(0, 30)}...</span>
                                        </div>
                                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'language' ? false : true}>
                                            <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{gig.language}</span>
                                        </div>
                                        <div className="bp3-tab-panel" role="tabpanel" aria-hidden={selected === 'budget' ? false : true}>
                                            <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp3-tag .modifier">{gig.budgetMin}-{gig.budgetMax} USD</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '3%' }} >
                                    {/* <button style={{marginTop:'7%',marginLeft:'10%',display:'block'}} type="button" className="bp3-button">Connect</button> */}


                                    <Waveform url={gig.track_url} title={gig.name} />


                                </div>

                            </blockquote>
                        </div>) : null}


                    </div>

                    <div className="pagination">
                        {currentPage === 1 ? null : <span onClick={() => changePage('prev')} className="bp3-tag .modifier page-change">previous page</span>}
                        {currentPage === pageSize ? null : <span onClick={() => changePage('next')} className="bp3-tag .modifier page-change">next page</span>}
                    </div>
                </div>



            </div>
        )
    }


}

export default Jobs