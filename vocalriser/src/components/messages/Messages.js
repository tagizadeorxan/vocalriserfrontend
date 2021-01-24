import React, { useState, useContext, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getEachMessages, getMessages, sendMessage, deleteMessage, createMessage } from '../helpers/messages.helper'
import PianoPlay from '../piano'
import './Messages.css'
import { Link } from 'react-router-dom'


let start = true

let Messages = () => {
    const sendMessageInput = useRef()
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [userdata, setUserData] = useState({})
    const [messages, setMessages] = useState([])
    const [eachMessages, setEachMessages] = useState([])
    const [selectedMessage, setSelectedMessage] = useState()


    const handleDeleteMessage = async (message_id, type) => {
        let data = {
            id: message_id,
            type
        }
        console.log(data)
        let result = await deleteMessage(data, user.token)

        if (result) {

            let messages = await getMessages(userdata.id, user.token)
            if (messages) {
                setMessages(messages)
            }
        }
    }


    const handleSendMessage = async (e, message_id, sender_id, sender_fullname, sender_message) => {
        e.preventDefault()
        let data = {
            message_id,
            sender_id,
            sender_fullname,
            sender_message: sendMessageInput.current.value
        }
        console.log(data)

        let result = await sendMessage(data, user.token)
        let eachMessage = await getEachMessages(message_id, user.token)
        if (result && eachMessage) {
            setEachMessages(eachMessage)
            sendMessageInput.current.value = ""
        }
    }

    const handleEachMessages = async (message_id) => {
        console.log(message_id)
        setSelectedMessage(message_id)
        console.log(message_id)
        console.log("working")
        let eachMessages = await getEachMessages(message_id, user.token)
        console.log(eachMessages)
        if (eachMessages) {
            setEachMessages(eachMessages)
        }
    }

    let checkCurrentUser = async () => {
        console.log(user.token)
        let result = await requestCurrentUser(user.token)
        console.log(result.data.id)

        let messages = await getMessages(result.data.id, user.token)
        console.log(messages)
        if (result.status && messages) {
            setUserData(result.data)
            setMessages(messages)
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

    else if (!userdata.hasOwnProperty('id')) {
        return (
            <Redirect push to="/" />
        )
    }

    else {
        return (
            <div>
               
                {messages.length > 0 ? <div className="message-container">

                    <div className="bp3-card .modifier main-message-container">
                        {messages.map((message, index) => {
                            if (message.sender === userdata.id && message.sender_active === 1) {
                                return <div key={index} >
                                    <button style={{ width: '89%' }} className={`bp3-button bp3-outlined bp3-intent-${selectedMessage === message.id ? 'success' : null}`} onClick={() => handleEachMessages(message.id)} key={index}>{message.reciever_fullname}</button>
                                    <button style={{ float: 'right' }} onClick={() => handleDeleteMessage(message.id, 'sender_active')} className="bp3-button bp3-icon-delete bp3-intent-danger"></button>
                                </div>
                            } else if (message.reciever === userdata.id && message.reciever_active === 1) {
                                return <div key={index}>
                                    <button style={{ width: '89%' }} className={`bp3-button bp3-outlined bp3-intent-${selectedMessage === message.id ? 'success' : null}`} onClick={() => handleEachMessages(message.id)} key={index}>{message.sender_fullname}</button>
                                    <button style={{ float: 'right' }} onClick={() => handleDeleteMessage(message.id, 'reciever_active')} className="bp3-button bp3-icon-delete bp3-intent-danger"></button>
                                </div>
                            }
                        })}
                    </div>

                    <div className="bp3-card .modifier each-message-container">
                        {eachMessages.length > 0 ? eachMessages.map((m, i) => <div key={i}>
                            <Link to={`/profiles/${m.sender_id}`}>{m.sender_fullname}</Link>
                            <p>{m.sender_message}</p>
                        </div>) : 'no Messages'}
                        <div style={{ marginTop: "10%" }}>
                            <form onSubmit={(e) => handleSendMessage(e, selectedMessage, userdata.id, `${userdata.first_name} ${userdata.last_name}`)}>
                                <input ref={sendMessageInput} type="text" minLength={1} className="bp3-input" required />
                                <button style={{ marginLeft: "1%" }} className="bp3-button ">send message</button>
                            </form>

                        </div>

                    </div>


                </div> : null}
            </div>
        )
    }


}

export default Messages