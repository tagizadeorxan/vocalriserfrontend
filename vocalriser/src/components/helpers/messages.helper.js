import Utils from '../utils/common.utils'

export let getMessages = async (user_id,token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/users/getMessages/${user_id}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } 
        }).then(res=>{
            if(res) {
                result = res
            }
        })
         .catch(err =>
             console.log(err)
         )

    return result
}


export let getEachMessages = async (message_id,token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/users/getEachMessages/${message_id}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } 
        }).then(res=>{
            if(res) {
                result = res
            }
        })
         .catch(err =>
             console.log(err)
         )

    return result
}



export let sendMessage = async (data,token) => {
    let result = false;

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body:JSON.stringify(data)
    }
    await fetch(`${Utils.url}/api/v1/users/sendMessage`, options)
        .then(res => {
            if (res.status === 200) {
                result = true
            } 
        })
         .catch(err =>
             console.log(err)
         )

    return result
}

export let createMessage = async (data,token) => {
    let result = {};

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body:JSON.stringify(data)
    }
    await fetch(`${Utils.url}/api/v1/users/createMessage`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } 
        })
        .then(res=> {
            if(res) {
                result = res
            }
        })
         .catch(err =>
             console.log(err)
         )

    return result
}


export let deleteMessage = async (data,token) => {
    let result = false;

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body:JSON.stringify(data)
    }
    await fetch(`${Utils.url}/api/v1/users/deleteMessage`, options)
        .then(res => {
            if (res.status === 200) {
                result = true
            } 
        })
         .catch(err =>
             console.log(err)
         )

    return result
}
