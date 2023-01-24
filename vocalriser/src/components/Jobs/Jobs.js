import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getGigs, whereUserBiddedGigs } from '../helpers/gig.helper'
import PianoPlay from '../piano'
import Search from './Search'
import Waveform from "../waveform";
import { Link } from 'react-router-dom'
import './Jobs.css'


const Jobs = () => {
  
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [gigs, setGigs] = useState([])
    const [selected, setSelected] = useState('requirements')
    let [pageSize, setPageSize] = useState(1)
    let [currentPage, setCurrentPage] = useState(1)
    const [start,setStart] = useState(true)

    const [whereUserBidded, setWhereUserBidded] = useState([])




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

    const checkCurrentUser = async () => {
        const result = await requestCurrentUser(user.token)
        const userBiddings = await whereUserBiddedGigs(result.data.id, user.token)
       
        if (result.status) {
          
            setWhereUserBidded(userBiddings)
            let gigs = await getGigs(result.data.type, result.data.gender, user.token)
            setPageSize(Math.ceil(gigs.length === 0 ? (gigs.length + 1) / 2 : gigs.length / 2))
         
            setGigs(gigs)
            dispatch({
                type: "GIGS",
                payload: gigs
            })
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
            <Navigate push to="/home" />
        )
    }

    else {
        return (
            <div className="job-page-container">
                <Search search={setSearchData} />
                <div style={{ marginLeft: '5%' }}>
                    <div className="jobs-container">

                        {gigs.length > 0 ? gigs.reverse().slice((currentPage - 1) * 2, currentPage * 2).map((gig, index) => <div key={index}>
                            <blockquote className="bp4-blockquote bp4-card bp4-interactive each-job">
                               
                                <div className="each-job-element">
                                    {/* <img alt="user" style={{ width: '100px' }} src="https://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png" /> */}
                                </div>
                                <div className="each-job-element" style={{ width: '500px' }}>
                                    <Link to={`/gigs/${gig.id}`}> <h1 className="bp4-heading">{gig.name}</h1></Link>
                                    <span style={{ marginLeft: '1%' }} className="bp4-tag .modifier">{gig.bpm}</span>
                                    <span style={{ marginLeft: '1%' }} className="bp4-tag .modifier">{gig.genre}</span>

                                    <div className="bp4-tabs">
                                        <ul className="bp4-tab-list .modifier" role="tablist">
                                            <li onClick={() => panelSelect('requirements')} className="bp4-tab" role="tab" aria-selected={selected === 'requirements' ? true : false}>Requirements</li>
                                            <li onClick={() => panelSelect('language')} className="bp4-tab" role="tab" aria-selected={selected === 'language' ? true : false}>Language</li>
                                            <li onClick={() => panelSelect('budget')} className="bp4-tab" role="tab" aria-selected={selected === 'budget' ? true : false}>Budget</li>
                                        </ul>
                                        <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'requirements' ? false : true}>
                                            <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{gig.requirements.substring(0, 30)}...</span>
                                        </div>
                                        <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'language' ? false : true}>
                                            <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{gig.language}</span>
                                        </div>
                                        <div className="bp4-tab-panel" role="tabpanel" aria-hidden={selected === 'budget' ? false : true}>
                                            <span style={{ marginLeft: '1%', marginBottom: '1%' }} className="bp4-tag .modifier">{gig.budgetMin}-{gig.budgetMax} USD</span>
                                        </div>
                                    </div>
                                    {
                                    whereUserBidded.find(b=> b.gig_id === gig.id) ? 
                                    <div style={{ marginTop: '7%', textAlign: "center", float:"left" }}><span className={`bp4-tag bp4-intent-success`}>Submitted</span></div> 
                                     : null
                                }
                                </div>
                                <div style={{ marginTop: '3%' }} >
                                    {/* <button style={{marginTop:'7%',marginLeft:'10%',display:'block'}} type="button" className="bp4-button">Connect</button> */}


                                    <Waveform url={gig.track_url} title={gig.name} />


                                </div>

                            </blockquote>
                        </div>) : <div className="information-block">No jobs for now</div>}


                    </div>

                    <div className="pagination">
                        {currentPage === 1 ? null : <span onClick={() => changePage('prev')} className="bp4-tag .modifier page-change">previous page</span>}
                        {currentPage === pageSize ? null : <span onClick={() => changePage('next')} className="bp4-tag .modifier page-change">next page</span>}
                    </div>
                </div>



            </div>
        )
    }


}

export default Jobs