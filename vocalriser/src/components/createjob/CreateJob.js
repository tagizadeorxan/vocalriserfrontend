import React, { useState, useRef, useContext } from 'react'
import { requestCurrentUser } from '../helpers/auth.helper'
import { getLanguages, getGenres } from '../helpers/common.helper'
import { createGig } from '../helpers/gig.helper'
import UserContext from '../../contexts/user.context';
import { Redirect } from 'react-router-dom';
import PianoPlay from '../piano'
import './CreateJob.css'

let start = true

let CreateJob = () => {

    const gigname = useRef()
    const budgetMin = useRef()
    const budgetMax = useRef()
    const gender = useRef()
    const type = useRef()
    const track_url = useRef()
    const bpm = useRef()
    const requirements = useRef()
    const language = useRef()
    const genre = useRef()

    const [user, dispatch] = useContext(UserContext)

    const [login, setLogin] = useState('waiting')
    const [languages, setLanguages] = useState([])
    const [genres, setGenres] = useState([])
    const [created, setCreated] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()




    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    function addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }


    const handleGigCreate = async (e) => {
        e.preventDefault()
        setError(false)
        let date = new Date()

        let data = {
            user_id: user.user.id,
            name: gigname.current.value,
            expireDate: formatDate(addDays(date, 15)),
            createDate: formatDate(date),
            budgetMin: budgetMin.current.value,
            budgetMax: budgetMax.current.value,
            gender: gender.current.value,
            type: type.current.value,
            track_url: track_url.current.value,
            bpm: bpm.current.value,
            requirements: requirements.current.value,
            genre: genre.current.value,
            language: language.current.value,
            createdBy: user.user.first_name + '' + user.user.last_name
        }


        let result = await createGig(data, user.token)

        if (result) {
            setCreated(true)
        } else {
            setErrorMessage('Please try again later')
            setError(true)
        }
    }

    let checkCurrentUser = async () => {
        let result = await requestCurrentUser(user.token)
        let languages = await getLanguages()
        let genres = await getGenres()
        if (result.status) {
            setLanguages(languages)
            setGenres(genres)
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
    else if (!user.user.hasOwnProperty('id')) {
        return (
            <Redirect push to="/home" />
        )
    }

    else {
        return (

            <div className="createjob-container">
                {created ? <Redirect push to="/jobs" /> : null}
                <form onSubmit={handleGigCreate}>
                    <div className="bp3-input-group .modifier createjob-general">
                        <input ref={gigname} type={"text"} maxLength={20} minLength={6} className="bp3-input" placeholder="Enter gig name..." autoComplete="on" required />
                        <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
                    </div>

                    <div className="bp3-input-group .modifier createjob-general">
                        <input ref={bpm} type={"number"} max="1015" min="60" className="bp3-input" placeholder="BPM..." autoComplete="on" required />
                        <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-numerical .modifier`}></button>
                    </div>

                    <div className="bp3-input-group .modifier createjob-general">
                        <input ref={budgetMin} type={"number"} className="bp3-input" placeholder="Budget min..." min="20"  autoComplete="on" required />
                        <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-dollar .modifier`}></button>
                    </div>

                    <div className="bp3-input-group .modifier createjob-general">
                        <input ref={budgetMax} type={"number"} className="bp3-input" placeholder="Budget max..." min="20"  autoComplete="on" required />
                        <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-dollar .modifier`}></button>
                    </div>

                    <div className="bp3-select .modifier createjob-general">
                        <select ref={gender} required>
                            <option value="">Gender...</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>

                    <div className="bp3-select .modifier createjob-general">
                        <select defaultValue="" ref={type} required>
                            <option value="">Type...</option>

                            {user.user.type === "P" || user.user.type === "VP" ? <option value="V">Vocalist</option> : null}
                            {user.user.type === "V" || user.user.type === "VP" ? <option value="P">Producer</option> : null}
                        </select>
                    </div>

                    <div className="bp3-input-group .modifier createjob-general">
                        <input ref={track_url} type={"text"} maxLength={500} className="bp3-input" placeholder="Track url...{example:http//:music.mp3}" autoComplete="on" required />
                        <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-music .modifier`}></button>
                    </div>

                    <div className="bp3-input-group .modifier createjob-general">
                        <textarea ref={requirements} className="bp3-input .modifier" dir="auto" placeholder="Requirements..." required></textarea>
                    </div>


                    {languages.length > 0 ? <div className="bp3-select .modifier createjob-general">
                        <select ref={language} required>
                            {languages.map((l, i) => <option key={i} value={l}>{l}</option>)}
                        </select>
                    </div> : null}

                    {genres.length > 0 ? <div className="bp3-select .modifier createjob-general">
                        <select ref={genre} required>
                            {genres.map((l, i) => <option key={i} value={l}>{l}</option>)}
                        </select>
                    </div> : null}

                    <div className="bp3-input-group .modifier createjob-general">
                        {error ? <p className="register-general register-error"><i className="bp3-icon-error"></i> {errorMessage}</p> : null}
                    </div>

                    <div className="bp3-input-group .modifier createjob-general">
                        <button className="bp3-button bp3-intent-success">Create</button>
                    </div>




                </form>


                {/* <div className="bp3-input-group .modifier createjob-general">
                <input ref={username} type={"text"} className="bp3-input" placeholder="Enter your username..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier createjob-general">
                <input ref={email} type={"email"} className="bp3-input" placeholder="Enter your email..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-envelope .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier createjob-general">
                <input ref={first_name} type={"text"} className="bp3-input" placeholder="Enter your first name..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier createjob-general">
                <input ref={last_name} type={"text"} className="bp3-input" placeholder="Enter your last name..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier createjob-general">
                <input ref={age} type={"number"} className="bp3-input" placeholder="Enter your last age..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>
     

            <div className="bp3-select .modifier createjob-general">
                <select ref={type}>
                    <option selected value="">Type...</option>
                    <option value="V">Vocalist</option>
                    <option value="P">Producer</option>
                    <option value="VP">Both</option>
                </select>
            </div>

            <div className="bp3-input-group .modifier createjob-general">
                <input ref={password}  type={passwordShow ? "text" : "password"} className="bp3-input" placeholder="Enter your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp3-button bp3-minimal bp3-intent-warning ${passwordShow ? 'bp3-icon-unlock' : 'bp3-icon-lock'} .modifier`}></button>
            </div>
           
            <div className="bp3-input-group .modifier createjob-general">
                <input ref={confirm_password} type={passwordShow ? "text" : "password"} className="bp3-input" placeholder="Confirm your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp3-button bp3-minimal bp3-intent-warning ${passwordShow ? 'bp3-icon-unlock' : 'bp3-icon-lock'} .modifier`}></button>
            </div>


            <button type="button" onClick={signup} className={`bp3-button .modifier login-general ${error? 'bp3-intent-danger':'bp3-intent-success'}`}>Sign up</button>

            {error? <p className="createjob-general createjob-error"><i className="bp3-icon-error"></i> {errorMessage}</p>:null} */}
                {/* {success ? <Redirect push to="/" /> : null} */}
            </div>

        )
    }
}

export default CreateJob