import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../contexts/user.context'
import { requestCurrentUser } from '../helpers/auth.helper'
import { getGigByID , getPreparedContract, acceptGig ,sendContract} from '../helpers/gig.helper'
import { Redirect } from 'react-router-dom';
import Waveform from '../waveform'
import PianoPlay from '../piano'

const AwardedGig = (props) => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [viewedGig, setViewGig] = useState()
    const [contract,setContract] = useState('')


    useEffect(() => {
        checkCurrentUser()
    }, [])

    
    const handleAcceptGig = async () => {
        let result = await acceptGig(viewedGig.id,user.token)
        if(result) {
            setViewGig({...viewedGig,progress:1})
            sendContract({
              user_id:viewedGig.user_id,
              awardedUser:viewedGig.awardedUser,
              contract
            },user.token)
        }
    }


    let checkCurrentUser = async () => {

        let result = await requestCurrentUser(user.token)

        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })

            let viewedGig = await getGigByID(props.match.params.id, user.token)
            if(viewedGig.progress === 0) {
                console.log(props.match.params.id)
                let result = await getPreparedContract(props.match.params.id,user.token)
                console.log(contract)
                setContract(result.contract)
            }
            
            if (viewedGig) {
                setViewGig(viewedGig)
               
                console.log(user.user.id)
                console.log(viewedGig.awardedUser)
                setLogin('')
            } else {
                setLogin('failed')
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
    else if (!viewedGig.hasOwnProperty('id')) {
        return (
            <Redirect push to="/jobs" />
        )
    }

    else if (viewedGig.awardedUser === user.user.id && viewedGig.progress === 0) {
        return (
            <div className="bp3-dialog-container">
                <div className="bp3-dialog">
                    <div className="bp3-dialog-header">
                        <span className="bp3-icon-large bp3-icon-inbox"></span>
                        <h4 className="bp3-heading">Aggrement</h4>
                        <button aria-label="Close" className="bp3-dialog-close-button bp3-button bp3-minimal bp3-icon-cross"></button>
                    </div>
                    <div className="bp3-dialog-body">
                        {contract.length>0 ? contract:null}
    </div>
                    <div className="bp3-dialog-footer">
                        <div className="bp3-dialog-footer-actions">
                            <button type="button" className="bp3-button">Decline</button>
                            <button type="submit" className="bp3-button bp3-intent-primary" onClick={handleAcceptGig}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else if(viewedGig.progress > 0) {

        return (
            <div className="gig-container">
                <div className="bp3-card each-gig-container">
                    <div className="each-gig-element">
                        <h1 className="bp3-heading">{viewedGig.name}</h1>
                        <span className={`bp3-tag bp3-intent-${viewedGig.active === 1 ? 'warning' : viewedGig.active === 2 ? 'success' : 'danger'}`}>
                            {viewedGig.active === 1 ? 'active' : viewedGig.active === 2 ? 'Awarded' : 'Closed'}</span>

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
                    </div>

                    <div className="each-gig-element">
                        Requirements:<p></p><span style={{ marginBottom: '1%', marginRight: '1%' }} className="bp3-tag .modifier">{viewedGig.requirements}</span>
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
        return(
             <Redirect push to="/jobs" />
        )
    }
}

export default AwardedGig