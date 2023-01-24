import React, { useState } from 'react'
import './NoMatch.css'
import { getCards } from '../helpers/gig.helper'



const NoMatch = () => {

    const [cards, setCards] = useState([])
    const [day, setDay] = useState()
    const [start,setStart] = useState(true)



    const getQuotes = async () => {
        var d = new Date();
        var n = d.getDate()

        setDay(n)
        let result = await getCards()
        setCards(result)
    
        
    }

    if(start) {
        getQuotes()
        setStart(false)
    }


    return (
        <div className="page-not-found-container">
            <h1 className="bp4-heading bp4-large">Page Not Found</h1>
            <span className="bp4-icon bp4-icon-ban-circle"></span>

            {cards.length > 0 ? <div className="page-not-found-cards">
                <div className="bp4-card .modifier">
                   <img alt="quote" src={day ? cards[day].img : "null"} />
                </div>

            </div> : null}
        </div>
    )
}

export default NoMatch