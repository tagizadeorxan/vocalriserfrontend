import React, { useState, useContext, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { getEachMessages, getMessages, sendMessage, deleteMessage, createMessage } from '../helpers/messages.helper'
import { readNotification, createNotification } from '../helpers/notifications.helper'
import PianoPlay from '../piano'
import './Messages.css'
import { Link } from 'react-router-dom'




let Messages = () => {
    const sendMessageInput = useRef()
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
    const [messages, setMessages] = useState([])
    const [eachMessages, setEachMessages] = useState([])
    const [selectedMessage, setSelectedMessage] = useState(0)
    const [start, setStart] = useState(true)


    const handleNotification = async () => {
       await user.notifications.map(n => {
            if (n.type === "message") {

                readNotification(n.id, user.token)
          

            }
        })

        dispatch({
            type: "NOTIFICATIONS",
            payload: user.notifications.filter(item => item.type !== 'message')
        })


    }

    const handleDeleteMessage = async (message_id, type) => {
        let data = {
            id: message_id,
            type
        }

        let result = await deleteMessage(data, user.token)

        if (result) {
            let messages = await getMessages(user.user.id, user.token)
            if (messages) {
                setMessages(messages)
            }
        }
    }


    const handleSendMessage = async (e, message_id, sender_id, sender_fullname, sender_message) => {
        e.preventDefault()


        let getMessagebyID = messages.find(e => e.id === message_id)
        let toUser;
        if (sender_id === getMessagebyID.sender) {
            toUser = getMessagebyID.reciever
        } else {
            toUser = getMessagebyID.sender
        }

        let notification = {
            type: "message",
            fromUser: sender_id,
            toUser,
            messageID: message_id
        }
        let notify = await createNotification(notification, user.token)


        let data = {
            message_id,
            sender_id,
            sender_fullname,
            sender_message: sendMessageInput.current.value
        }

        let result = await sendMessage(data, user.token)
        let eachMessage = await getEachMessages(message_id, user.token)
        if (result && eachMessage) {
            setEachMessages(eachMessage)
            sendMessageInput.current.value = ""
        }
    }

    const handleEachMessages = async (message_id) => {


        setSelectedMessage(message_id)

        let eachMessages = await getEachMessages(message_id, user.token)

        if (eachMessages) {
            setEachMessages(eachMessages)
        }
    }

    const checkCurrentUser = async () => {
        handleNotification()

        const result = await requestCurrentUser(user.token)


        const messages = await getMessages(result.data.id, user.token)

        if (result.status && messages) {
            await dispatch({
                type: "USER",
                payload: result.data
            })
            setMessages(messages.reverse())
            setLogin('success')
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
            <PianoPlay width={300} classAdd="loading" />
        )
    }
    else if (login === 'failed') {
        return (
            <Navigate push to="/" />
        )
    }

    else if (!user.user.hasOwnProperty('id')) {
        return (
            <Navigate push to="/" />
        )
    }

    else {
        return (
            <div>

                {messages.length > 0 ? <div className="message-container">

                    <div className="bp4-card .modifier main-message-container">
                        {messages.map((message, index) => {

                            if (message.sender === user.user.id && message.sender_active === 1) {
                                return <div key={index}  >



                                    <button style={{ width: '89%', position: 'relative' }} className={`bp4-button bp4-outlined bp4-intent-${selectedMessage === message.id ? 'success' : null}`} onClick={() => handleEachMessages(message.id)} key={index}>{message.reciever_fullname}</button>

                                    <button style={{ float: 'right' }} onClick={() => handleDeleteMessage(message.id, 'sender_active')} className="bp4-button bp4-minimal bp4-icon-delete bp4-intent-danger"></button>
                                </div>
                            } else if (message.reciever === user.user.id && message.reciever_active === 1) {
                                return <div key={index}  >

                                    <button style={{ width: '89%', position: 'relative' }} className={`bp4-button bp4-outlined bp4-intent-${selectedMessage === message.id ? 'success' : null}`} onClick={() => handleEachMessages(message.id)} key={index}>{message.sender_fullname}</button>

                                    <button style={{ float: 'right' }} onClick={() => handleDeleteMessage(message.id, 'sender_active')} className="bp4-button bp4-minimal bp4-icon-delete bp4-intent-danger"></button>
                                </div>
                            }
                        })}
                    </div>

                    {selectedMessage > 0 ? <div className="bp4-card .modifier each-message-container">
                        {eachMessages.length > 0 ? eachMessages.map((m, i) => <div key={i}>
                            <Link to={`/profiles/${m.sender_id}`}>{m.sender_fullname}</Link>
                            <p>{m.sender_message}</p>
                        </div>) : 'no Messages'}
                        <div style={{ marginTop: "10%" }}>
                            <form onSubmit={(e) => handleSendMessage(e, selectedMessage, user.user.id, `${user.user.first_name} ${user.user.last_name}`)}>
                                <input ref={sendMessageInput} type="text" minLength={1} className="bp4-input" required />
                                <button style={{ marginLeft: "1%" }} className="bp4-button ">send message</button>
                            </form>

                        </div>

                    </div> : null}


                </div> : <div className="information-block">
                        You have not received any messages yet!
                        Employers can message bidders to discuss bids and ask questions.

                        This is an important part of the bidding process as it allows for questions to be
                        answered before a gig is awarded.

                        Keep an eye out for new messages.

                </div>}
            </div>
        )
    }


}

export default Messages