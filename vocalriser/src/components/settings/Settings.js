import React from 'react'
import './Settings.css'

const Settings = () => {

    const handlePress = (type) => {
        const oldStatus = localStorage.getItem(type)
        localStorage.setItem(type, oldStatus === 'true' ? false : true)
    }



    return (
        <div>
            <div className="each-setting">
                <text style={{ marginRight: '1%' }}>Home music</text>
                <label className="switch">
                    <input onClick={() => handlePress('homeSound')} type="checkbox" defaultChecked={localStorage.getItem('homeSound') === 'true' ? true : false} />
                    <span className="slider round"></span>
                </label>
            </div>



        </div>
    )
}

export default Settings