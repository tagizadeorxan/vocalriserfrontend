import React, { useContext, useState } from 'react'
import UserContext from '../../contexts/user.context'
import { requestCurrentUser } from '../helpers/auth.helper'
import { getGigByID, getPreparedContract, acceptGig, sendContract } from '../helpers/gig.helper'
import { createNotification } from '../helpers/notifications.helper'
import { Navigate } from 'react-router-dom';
import Waveform from '../waveform'
import PianoPlay from '../piano'



const AwardedGig = (props) => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [viewedGig, setViewGig] = useState()
    const [contract, setContract] = useState('')
    const [start, setStart] = useState(true)


    const handleAcceptGig = async () => {
        const result = await acceptGig(viewedGig.id, user.token)
        if (result) {

            let notification = {
                type: "acceptGig",
                fromUser: user.user.id,
                toUser: viewedGig.user_id,
                gigID: viewedGig.id
            }
            let notify = await createNotification(notification, user.token)



            setViewGig({ ...viewedGig, progress: 1 })
            sendContract({
                user_id: viewedGig.user_id,
                awardedUser: viewedGig.awardedUser,
                contract
            }, user.token)
        }
    }


    const checkCurrentUser = async () => {

        const result = await requestCurrentUser(user.token)

        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })

            const viewedGig = await getGigByID(props.match.params.id, user.token)
            if (viewedGig.progress === 0) {
                const result = await getPreparedContract(props.match.params.id, user.token)
                setContract(result.contract)
            }

            if (viewedGig) {
                setViewGig(viewedGig)
                setLogin('')
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
    else if (!viewedGig.hasOwnProperty('id')) {
        return (
            <Navigate push to="/jobs" />
        )
    }

    else if (viewedGig.awardedUser === user.user.id && viewedGig.progress === 0) {
        return (
            <div className="bp4-dialog-container">
                <div className="bp4-dialog">
                    <div className="bp4-dialog-header">
                        <span className="bp4-icon-large bp4-icon-inbox"></span>
                        <h4 className="bp4-heading">Aggrement</h4>
                        <button aria-label="Close" className="bp4-dialog-close-button bp4-button bp4-minimal bp4-icon-cross"></button>
                    </div>
                    <div className="bp4-dialog-body">
                        {contract.length > 0 ? contract : null}
                    </div>
                    <div className="bp4-dialog-footer">
                        <div className="bp4-dialog-footer-actions">
                            <button type="button" className="bp4-button">Decline</button>
                            <button type="submit" className="bp4-button bp4-intent-primary" onClick={handleAcceptGig}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else if (viewedGig.progress > 0) {

        return (
            <div className="gig-container">
                <div className="bp4-card each-gig-container">
                    <div className="each-gig-element">
                        <h1 className="bp4-heading">{viewedGig.name}</h1>
                        <span className={`bp4-tag bp4-intent-${viewedGig.active === 1 ? 'warning' : viewedGig.active === 2 ? 'success' : 'danger'}`}>
                            {viewedGig.active === 1 ? 'active' : viewedGig.active === 2 ? 'Awarded' : 'Closed'}</span>

                    </div>

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
                        Created by:<span style={{ marginLeft: '1%', marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{viewedGig.createdBy}</span>
                    </div>

                    <div className="each-gig-element">
                        Requirements:<p></p><span style={{ marginBottom: '1%', marginRight: '1%' }} className="bp4-tag .modifier">{viewedGig.requirements}</span>
                    </div>

                </div>


            </div>

        )
    }

    else if (viewedGig.awardedUser !== user.user.id && viewedGig.progress === 0) {
        return (
            <p>Agreement waiting for acception</p>
        )
    }

    else {
        return (
            <Navigate push to="/jobs" />
        )
    }
}

export default AwardedGig