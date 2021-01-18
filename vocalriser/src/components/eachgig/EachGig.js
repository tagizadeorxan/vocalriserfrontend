import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../contexts/user.context'
import { requestCurrentUser } from '../helpers/auth.helper'
import { getGigByID } from '../helpers/gig.helper'
import { Redirect } from 'react-router-dom';
import Waveform from '../waveform'
import PianoPlay from '../piano'
import './EachGig.css'

const EachGig = (props) => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [viewedGig, setViewGig] = useState()


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
            console.log(props)
            let viewedGig = await getGigByID(props.match.params.id, user.token)
            console.log(viewedGig)
            if (viewedGig) {
                setViewGig(viewedGig)
                setLogin('success')
            } else {
                setLogin('waiting')
            }

        } else {
            setLogin('failed')
        }
    }

    if (login === 'waiting') {
        return (
            <PianoPlay width={400} />
        )
    }
    else if (login === 'failed') {
        return (
            <Redirect push to="/" />

        )
    }
    else {
        return (
            <div className="bp3-card each-gig-container">
                <div className="each-gig-element">
                    <h1 className="bp3-heading">{viewedGig.name}</h1>
                </div>
                <div className="each-gig-element">
                    <Waveform url={viewedGig.track_url} title={viewedGig.name} />
                </div>

                <div className="each-gig-element">
                    Created date:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{new Date(viewedGig.createDate).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                </div>

                <div className="each-gig-element">
                    Looking for:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.type === 'V' ? 'vocalist' : 'producer'}</span>
                </div>
                <div className="each-gig-element">
                    Language:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.language}</span>
                    Genre:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.genre}</span>
                    BPM:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.bpm}</span>
                </div>
                <div className="each-gig-element">
                    Created by:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.createdBy}</span>
                    Budget:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.budgetMin}</span>
         -<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.budgetMax}</span>USD
</div>

                <div className="each-gig-element">
                    Requirements:<p></p><span style={{ marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.requirements}</span>
                </div>

            </div>
        )
    }
}

export default EachGig