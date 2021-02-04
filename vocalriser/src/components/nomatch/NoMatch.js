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
            <h1 className="bp3-heading bp3-large">Page Not Found</h1>
            <span className="bp3-icon bp3-icon-ban-circle"></span>

            {cards.length > 0 ? <div className="page-not-found-cards">
                <div className="bp3-card .modifier">
                   <img alt="quote" src={day ? cards[day].img : "null"} />
                </div>

            </div> : null}
        </div>
    )
}

export default NoMatch