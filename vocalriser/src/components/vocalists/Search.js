import React, { useRef } from 'react'
import './Search.css'


const Search = ({ search }) => {

    const soundslike = useRef()
    const microphone = useRef()
    const genres = useRef()
    const gender = useRef()

    const handleSearch = () => {
        let data = {}

        if (soundslike.current.value.length > 0) data['soundslike'] = soundslike.current.value
        if (microphone.current.value.length > 0) data['microphone'] = microphone.current.value
        if (genres.current.value.length > 0) data['genres'] = genres.current.value
        if (gender.current.value.length > 0 && gender.current.value !== 'Gender...') data['gender'] = gender.current.value
        search(data)
    }

    return (
        <div className="search-container">

            <div className="bp3-input-group .modifier search-container-field">
                <span className="bp3-icon bp3-icon-filter"></span>
                <input ref={soundslike} type="text" className="bp3-input" placeholder="Sounds like..." />
            </div>

            <div className="bp3-input-group .modifier search-container-field">
                <span className="bp3-icon bp3-icon-filter"></span>
                <input ref={microphone} type="text" className="bp3-input" placeholder="Microphone..." />
            </div>

            <div className="bp3-input-group .modifier search-container-field">
                <span className="bp3-icon bp3-icon-filter"></span>
                <input ref={genres} type="text" className="bp3-input" placeholder="Genre..." />
            </div>

            <div className="search-container-field">
                <div className="bp3-select .modifier">
                    <select defaultValue="Gender..." ref={gender}>
                        <option >Gender...</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>

                    </select>
                </div>

            </div>


            <div className="search-container-field">
                <button onClick={handleSearch} type="button" className="bp3-button bp3-icon-search .modifier">Search</button>
            </div>

        </div>
    )
}

export default Search