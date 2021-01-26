import Utils from '../utils/common.utils'


export let createNotification = async (data, token) => {
    let result = false;

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    }

    await fetch(`${Utils.url}/api/v1/users/createNotification`, options)
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


export let getNotifications = async (user_id, token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }

    await fetch(`${Utils.url}/api/v1/users/getNotifications/${user_id}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => {
            if (res) {
                result = res
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}


export let readNotification = async (notification_id, token) => {
    let result = false

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }

    await fetch(`${Utils.url}/api/v1/users/readNotification/${notification_id}`, options)
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