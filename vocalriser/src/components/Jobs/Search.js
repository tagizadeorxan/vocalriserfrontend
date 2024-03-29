import React, { useRef } from 'react'
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import './Search.css'


const Search = ({ search }) => {

    const name = useRef()
    const language = useRef()
    const genre = useRef()


    const handleSearch = () => {
        let data = {}
                
        if (name.current.value.length > 0)  data['name'] = name.current.value 
        if (language.current.value.length > 0)  data['language'] = language.current.value 
       if (genre.current.value.length > 0)  data['genre'] = genre.current.value 
        
        search(data)
    }

    return (
        <div className="search-container">

            <div className="bp4-input-group .modifier search-container-field">
                <span className="bp4-icon bp4-icon-filter"></span>
                <input ref={name} type="text" className="bp4-input" placeholder="Name..." />
            </div>

            <div className="bp4-input-group .modifier search-container-field">
                <span className="bp4-icon bp4-icon-filter"></span>
                <input ref={language} type="text" className="bp4-input" placeholder="Language..." />
            </div>

            <div className="bp4-input-group .modifier search-container-field">
                <span className="bp4-icon bp4-icon-filter"></span>
                <input ref={genre} type="text" className="bp4-input" placeholder="Genre..." />
            </div>



            <div className="search-container-field">
                <button onClick={handleSearch} type="button" className="bp4-button bp4-icon-search .modifier">Search</button>
            </div>

        </div>
    )
}

export default Search